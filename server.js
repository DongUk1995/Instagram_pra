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
