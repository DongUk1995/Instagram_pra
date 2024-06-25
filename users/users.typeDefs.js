import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firsName: String!
    lastName: String
    userName: String!
    email: String!
    createAt: String!
    updatedAt: String!
  }

  type Mutation {
    createAccount(
      firsName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): User
  }
  type Query {
    SeeProfile(username: String!): User
  }
`;
