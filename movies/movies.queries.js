import client from "../client";

export default {
  Query: {
    movies: () => client.movie.findMany(), //Client는 데이터 베이스와 어떻게 연결할 것인가. 즉 연결고리라는 것
    // 데이터베이스와 소통을 할건데 쿼리의 무비를 다 찾을 것임
    movie: (_, { id }) =>
      client.movie.findUnique({
        where: { id },
      }),
  },
};
