const {gql} = require('apollo-server-express');

module.exports = gql`
  type Product {
    id: ID!
    Title: String
    Price: Float!
    Description: String
  }
  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }
  extend type Mutation {
    createProduct(Title: String, Price: Float, Description: String): Product,
    updateProduct(id:ID!,Title: String, Price: Float, Description: String): Product,
    deleteProduct(id:ID!): Product
  }
`;
