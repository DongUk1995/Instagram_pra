import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
      });
      if (!photo) {
        return {
          ok: true,
          error: "Photo Not Found",
        };
      }
      const likeWhere = {
        photoId_userId: {
          userId: loggedInUser.id, // admin 유저가 1번 포토를 좋아요를 눌렀는데
          photoId: id,
        },
      };
      const Like = await client.like.findUnique({
        where: likeWhere,
      });
      if (Like) {
        await client.like.delete({
          where: likeWhere,
        });
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photo.id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
