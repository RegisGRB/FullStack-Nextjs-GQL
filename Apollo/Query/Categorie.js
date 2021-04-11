import { gql, useQuery } from "@apollo/client";

const CreateCategorie = gql`
  mutation createCategorie($Products: [ID], $Title: String) {
    createCategorie(Title: $Title, Products: $Products) {
      id
      Title
      Products {
        id
        Title
      }
    }
  }
`;
const Categories = gql`
  query {
    categories {
      id
      Title
      Products {
        id
        Title
        Price
        Description
        Url
      }
    }
  }
`;
const CategoriesProductFilter = gql`
  query categoriesProductFilter($id: ID!, $value: String) {
    categoriesProductFilter(id: $id, value: $value) {
      id
      Title
      Products {
        Title
        id
        Url
        Price
        Description
      }
    }
  }
`;
const CategorieUpdate = gql`
  mutation updateCategorie($id: ID!, $Products: [ID], $Title: String) {
    updateCategorie(id: $id, Title: $Title, Products: $Products) {
      id
      Title
      Products {
        id
        Title
        Url
      }
    }
  }
`;

const DeleteCategorie = gql`
  mutation deleteCategorie($id: ID!) {
    deleteCategorie(id: $id) {
      id
    }
  }
`;

export default {
  CreateCategorie,
  CategorieUpdate,
  DeleteCategorie,
  Categories,
  CategoriesProductFilter
};
