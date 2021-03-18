const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    Firstname: String
    Lastname: String
    Phone: String
    Adress: String
    Email: String
    Password: String
    isAdmin: Boolean
  }
   type Query {
    users: [User]
    user(id: ID): User
  }
   type Mutation {
    signup(
      Firstname: String!
      Lastname: String!
      Phone: String!
      Adress: String!
      Email: String!
      Password: String!
      IsAdmin: Boolean!
    ): String
    login(Email: String!, password: String!): String
    update(
      id: ID!
      Firstname: String
      Lastname: String
      Phone: String
      Adress: String
      Email: String
      Password: String
      IsAdmin: Boolean
    ): User
  }
`;
