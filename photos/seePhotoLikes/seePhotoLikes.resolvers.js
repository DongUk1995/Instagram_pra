import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { id }) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id,
        },
        select: {
          user: true,
        },
      });
      return likes.map((like) => like.user); // [{}]로 표시되고 이걸 쓰지 않으면 [{{}}] 이렇게 된다.
    },
  },
};
