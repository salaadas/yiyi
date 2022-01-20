import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { MessageResolver } from './resolvers/message';
import { UserResolver } from './resolvers/user';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';

declare module 'express-session' {
  interface SessionData {
    userId: number; // to store userId in req.session
  }
}

const prisma = new PrismaClient();

(async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = createClient();

  app.use(
    session({
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      name: 'yid',
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      },
      secret: process.env.SECRET || 'ksdjfklsfdafewoovnwzzco',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, MessageResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      return {
        prisma,
        req,
        res,
      };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
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
