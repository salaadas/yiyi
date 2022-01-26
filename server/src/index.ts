import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { MessageResolver } from './resolvers/message';
import { UserResolver } from './resolvers/user';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import cors from 'cors';
import { COOKIE_NAME } from './constants';

declare module 'express-session' {
  interface SessionData {
    userId: number; // to store userId in req.session
  }
}

const prisma = new PrismaClient();

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const RedisStore = connectRedis(session);
  const redisClient = createClient(); // ({ url: process.env.REDIS_URL });

  app.use(
    cors({
      origin: true
        ? 'http://localhost:3000'
        : 'https://studio.apollographql.com',
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      name: COOKIE_NAME,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
      secret: 'ksdjfklsfdafewoovnwzzco',
      resave: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, MessageResolver, UserResolver],
    validate: false,
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => {
      return {
        prisma,
        req,
        res,
      };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(4000, () => {
    console.log(
      '\tServer is running on port: 4000\n\tGo to localhost:4000/graphql to query data'
    );
  });
})()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
