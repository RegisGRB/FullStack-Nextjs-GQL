import { gql, useQuery } from "@apollo/client";

const CreateOrder = gql`
  mutation createOrder(
    $User: ID!
    $Products: [ID]
    $AmountTotal: Float
    $Statut: String
  ) {
    createOrder(
      AmountTotal: $AmountTotal
      Products: $Products
      User: $User
      Statut: $Statut
    ) {
      id
      AmountTotal
    }
  }
`;
const Orders = gql`
  {
    orders {
      id
      AmountTotal
      Products {
        Title
        Price
        Url
      }
      Statut
      User {
        Firstname
      }
    }
  }
`;
const OrderUser = gql`
  query orderUser($id: ID!) {
    orderUser(id: $id) {
      id
      AmountTotal
      Products {
        Title
        Price
        Url
      }
      Statut
    }
  }
`;

const OrderUpdate = gql`
  mutation updateOrder($id: ID!, $Statut: String) {
    updateOrder(id: $id, Statut: $Statut) {
      id
      Statut
    }
  }
`;

const DeleteOrder = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      Statut
    }
  }
`;

export default {
  CreateOrder,
  OrderUser,
  OrderUpdate,
  DeleteOrder,
  Orders,
};
