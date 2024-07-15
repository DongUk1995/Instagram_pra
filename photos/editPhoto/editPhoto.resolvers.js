import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!oldPhto) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }
        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhto.hashtags, // 해시태그들을 다 없앤 후
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
