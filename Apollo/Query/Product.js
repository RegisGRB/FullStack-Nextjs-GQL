import { gql, useQuery } from "@apollo/client";
const Products = gql`
  {
    products {
      id
      Title
      Price
      Description
      Url
    }
  }
`;

const Product = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;
const ProductsByArray = gql`
  query productsByArray($array: [ID]) {
    productsByArray(array: $array) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;
const ProductsFilter = gql`
  query productsFilter($value: String!) {
    productsFilter(value: $value) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;

const DeleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;

const CreateProduct = gql`
  mutation createProduct(
    $Title: String
    $Price: Float
    $Description: String
    $Url: String
  ) {
    createProduct(
      Title: $Title
      Price: $Price
      Description: $Description
      Url: $Url
    ) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;
const ProductUpdate = gql`
  mutation updateProduct(
    $id: ID!
    $Title: String
    $Price: Float
    $Description: String
    $Url: String
  ) {
    updateProduct(
      id: $id
      Title: $Title
      Price: $Price
      Description: $Description
      Url: $Url
    ) {
      id
      Title
      Price
      Description
      Url
    }
  }
`;

export default {
  Products,
  Product,
  ProductsFilter,
  DeleteProduct,
  ProductUpdate,
  CreateProduct,
  ProductsByArray
};
