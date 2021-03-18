import { gql } from "apollo-server-express";

module.exports = gql`
    type Categorie {
        id: ID,
        Title:String,
        Products: [Product]
    }

    extend type Query {
        categories:[Categorie]
        categorie(id:ID): Categorie
    }
    extend type Mutation {
        createCategorie(Title:String, Products:[ID]): Categorie
    }
`