import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { MessageResolver } from './resolvers/message';
import { UserResolver } from './resolvers/user';

const prisma = new PrismaClient();

(async () => {
  const app = express();

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
