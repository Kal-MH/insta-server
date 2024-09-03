import "dotenv/config";

import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import logger from "morgan";

import schema, { resolvers, typeDefs } from "./schema/schema.js";
import { getUser, protectResolver } from "./schema/user/user.utils.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    // logger("tiny"),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
          protectResolver,
        };
      },
    })
  );

  app.use("/static", express.static("uploads"));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, () => resolve())
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

startServer();
