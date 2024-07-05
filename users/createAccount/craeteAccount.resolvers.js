import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        // 콘솔로그를 하면 유저네임과 이메일이 존재하면 데이터가 나오고 아니면 null이 나온다. 그럼 아래 코드는 만약 ex유저가 존재하면 아래 문구 출력 아님 그 다음코드 실행
        if (existingUser) {
          throw new Error("this username or password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account",
        };
      }
    },

    // 일단 만들기 전에 계정이 있는지 없는지 확인한다. existingUser (const만 해줘도 실행된다.)
    // 그 후 해시로 바꾼다(해시 비번은 일단 만들면 해시 바뀐 문자열과 로그인시 변경한 문자열을 비교 하여 로그인 여부를 결정한다.) uglyPassword
    // 그 후 계정을 만든다. client.user.create
  },
};
