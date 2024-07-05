import { gql } from "apollo-server-express";

export default gql`
  type unfollowUserRest {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): unfollowUserRest!
  }
`;
