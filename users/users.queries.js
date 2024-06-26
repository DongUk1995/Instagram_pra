import client from "../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};

//findUnique는 프리지마 스키마에서 유니크한 필드만 찾아본다.
