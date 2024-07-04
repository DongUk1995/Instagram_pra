require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser, proTectResolsever } from "./users/users.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      proTectResolsever,
    };
  },
});

const PORT = process.env.PORT; //dotenv를 사용하여 어디서든 env파일에 접근 할 수 있다.

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT}/✅`)
  );

//apollo가 graphql를 만드는 라이브러리이기 때문에 contxt 오브젝트를 이용한다.

/* require("dotenv").config();
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import logger from "morgan";
import http from "http";
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./users/users.utils";

const { json } = pkg;
const PORT = process.env.PORT;
const app = express();
const httpServer = http.createServer(app);
async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: false,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    graphqlUploadExpress(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      },
    })
  );
  app.use("/static", express.static("uploads"));

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀  Server ready at: http://localhost:${PORT}/graphql`);
}

startApolloServer(typeDefs, resolvers);
 */
