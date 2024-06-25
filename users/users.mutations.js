import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, passowrd }
    ) => {
      // 먼저 계정이 있는지 없는지 확인해야 함
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            { username },
            {
              email,
            },
          ],
        },
      });
      // hash password

      // save and return the user
    },
  },
};
