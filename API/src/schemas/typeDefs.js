import { gql } from "apollo-server-express";

export const typeDefs = gql`
   type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    isAdmin: Boolean
  }

  type Query {
    hello: String
    UserAll: [User]
    UserById(id: ID): User
  }
  type Mutation {
    signup(name: String!, password: String!): String
    login(name: String!, password: String!): String
    update(id: ID, name: String, password: String): User
  }




  type Order {
        id: ID,
        amountTotal:Float,
        products: [Product]
        user: User
    }
    input OrderInput {
        amountTotal:Float, 
        products:[ID],
        user:ID
    }
    extend type Query {
        orders:[Order]
        order(id:ID): Order
    }
    extend type Mutation {
        createOrder(amountTotal:Float, products:[ID],user:ID): Order
        # createOrder(input:OrderInput): Order
    }


    type Product {
    id: ID!
    title: String
    price: Float!
    description: String
  }
  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }
  extend type Mutation {
    createProduct(title: String, price: Float, description: String): Product,
    updateProduct(id:ID!,title: String, price: Float, description: String): Product,
    deleteProduct(id:ID!): Product
  }

`;
