import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
// 아니지 데이터베이스에서 그냥 찾는거지 무엇을 ? 1번 메시지랑 그게 내가 보낸게 아니여야지 맞지 ? 왜냐 상대방이 보내야지 안읽음이 되는 거지 그러고 룸에 내가 있는지 찾고
export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findFirst({
        where: {
          id,
          userId: {
            not: loggedInUser.id, //내가 보내지 않는 메시지
          },
          room: {
            users: {
              some: {
                id: loggedInUser.id, // 같이 내가 있는 방에
              },
            },
          },
          select: {
            id: true,
          },
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "Message not found.",
        };
      } //업데이트가 이루어지는거지 찾은 후 읽음 메시지로 전환이 되는 거
      await client.message.update({
        where: {
          id,
        },
        data: {
          read: true,
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
