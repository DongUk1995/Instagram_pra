require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({ schema });

const PORT = process.env.PORT; //dotenv를 사용하여 어디서든 env파일에 접근 할 수 있다.

server
  .listen(PORT)
  .then(() =>
    console.log(`🚀Server is running on http://localhost:${PORT}/✅`)
  );
