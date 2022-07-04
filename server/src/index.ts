import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import { createClient } from 'redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';
import { MyContext } from './types';

const RedisStore = connectRedis(session);
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
const redis = new Redis(process.env.REDIS_URL);

//runn
const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'ngl_test',
    username: 'farhan_binar',
    password: 'farhan322',
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const app = express();
  app.use(
    cors({
      origin: process.env.CORS,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const appolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
    }),
  });

  await appolloServer.start();

  appolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(parseInt(process.env.PORT), () =>
    console.log('app listen to localhost:4000')
  );
};

main().catch((err) => {
  console.log(err);
});
