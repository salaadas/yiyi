"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const client_1 = require("@prisma/client");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const message_1 = require("./resolvers/message");
const user_1 = require("./resolvers/user");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("./constants");
const prisma = new client_1.PrismaClient();
(async () => {
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = (0, redis_1.createClient)();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        name: constants_1.COOKIE_NAME,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        },
        secret: 'ksdjfklsfdafewoovnwzzco',
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, message_1.MessageResolver, user_1.UserResolver],
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
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('\tServer is running on port: 4000\n\tGo to localhost:4000/graphql to query data');
    });
})()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=index.js.map