import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { createWriteStream, WriteStream } from "fs";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  //const { id } = await jwt.verify(token, process.env.SECRET_KEY); //사용자가 토큰을 입력을 하면 토큰을 분석하여 리턴을 한다. 그 중에 아이디만 필요함. => conext, utils 참고
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar;
    const newFileName = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFileName
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:${process.env.PORT}/static/${newFileName}`;
  }
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }), // newPassword가 변경 하고 싶은 패스워드가 있으면 newPassword변경해서 리턴함.
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  }); // 사용자가 email만 수정하려고 보내면 나머지 unfind로 표시되고 데이터베이스에서는 그냥 eamil만 수정한다.
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "님 프로필 수정하지 못함요 ~",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

//editProfile: async ( _, { firstName, lastName, username, email, password: newPassword },context )
//=> context는 모든 resolvers에서 접근이 가능하다.
