import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY); // 토큰에 스크릿 키를 사용해서 서명을 한다. 그 안에 유저 아이디를 가지고
      return {
        ok: true,
        token,
      };
    },
  },
};
