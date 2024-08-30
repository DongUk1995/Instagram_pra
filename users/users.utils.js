import client from "../client";
import jwt from "jsonwebtoken";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
export function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}

// 함수에 함수를 넣는 이유는 미리 먼저 확인을 위해 코드가 실행되기 전 root, args, context, info를 받아 확인 하기 위함

// 1. 서버 컨테스트라는 것을 이용하여 헤더 데이터를 받고 getUser 토큰 전달
// 2. 토큰을 받은 getUser는 동일한 아이디를 가진 유저 리턴
// 3. 그렇게 리턴한 유저를 loggedInUser가 리턴하여 다른 리졸브들이 사용가능
// 4. 그 후 토큰이 필요한 리졸브들은 (_,_,loggedInUser) 넣어서 사용
