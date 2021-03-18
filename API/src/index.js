
import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import * as Config from "./configs";
import cors from "cors";



const startServer = async () => {
  const app = express();
  app.use(cors);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  await mongoose
    .connect(Config.db.url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to database");
    })
    .catch((err) => {
      console.log('couldn"t not connect to database', err);
      process.exit(-1);
    });

  app.listen({ port: Config.server.port }, () =>
    console.log(
      `🚀 GraphQl ready at http://localhost:${Config.server.port}${server.graphqlPath}`
    )
  );
};

startServer();
