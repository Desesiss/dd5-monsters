import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import {models, sequelize} from './models';
import cors from 'cors';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 3001 }, () => {
  console.log('Apollo Server on http://localhost:3001/graphql');
});