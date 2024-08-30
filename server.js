require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import logger from "morgan";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";
import pubsub from "./pubsub";

console.log(pubsub);
const { json } = pkg;
const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const serverCleanup = useServer(
  {
    schema,
    context: async ({ connectionParams: { token } }) => {
      if (!token) {
        throw new Error("You can't listen");
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser,
      };
    },
  },
  wsServer
);
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    csrfPrevention: false,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    logger("tiny"),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async (ctx) => {
        if (ctx.req) {
          return {
            loggedInUser: await getUser(ctx.req.headers.token),
          };
        }
      },
    })
  );

  app.use("/static", express.static("uploads"));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀  Server ready at: http://localhost:${PORT}/graphql`);
}

startApolloServer(typeDefs, resolvers);
