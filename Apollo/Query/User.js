import { gql, useQuery } from "@apollo/client";
const Login = gql`
  query login($Email: String!, $Password: String!) {
    login(Email: $Email, Password: $Password)
  }
`;
const Getme = gql`
  query user($id: ID!) {
    user(id: $id) {
      Firstname
      Lastname
      Email
      Phone
      Adress
      Password
      IsAdmin
    }
  }
`;
const Users = gql`
  {
    users {
      id
      Firstname
      Lastname
      Email
      Phone
      Adress
      Password
      IsAdmin
    }
  }
`;
const Signup = gql`
  mutation signup(
    $Firstname: String!
    $Lastname: String!
    $Email: String!
    $Phone: String!
    $Adress: String!
    $Password: String!
  ) {
    signup(
      Firstname: $Firstname
      Lastname: $Lastname
      Email: $Email
      Phone: $Phone
      Adress: $Adress
      Password: $Password
      IsAdmin: false
    )
  }
`;
const CreateUser = gql`
  mutation signup(
    $Firstname: String!
    $Lastname: String!
    $Email: String!
    $Phone: String!
    $Adress: String!
    $Password: String!
    $IsAdmin: Boolean!
  ) {
    signup(
      Firstname: $Firstname
      Lastname: $Lastname
      Email: $Email
      Phone: $Phone
      Adress: $Adress
      Password: $Password
      IsAdmin: $IsAdmin
    )
  }
`;
const DeleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      Firstname
      Lastname
      Email
      Phone
      Adress
      Password
      IsAdmin
    }
  }
`;
const UserUpdate = gql`
  mutation userUpdate(
    $id: ID!
    $Firstname: String
    $Lastname: String
    $Email: String
    $Phone: String
    $Adress: String
    $Password: String
    $IsAdmin: Boolean
  ) {
    userUpdate(
      id: $id
      Firstname: $Firstname
      Lastname: $Lastname
      Email: $Email
      Phone: $Phone
      Adress: $Adress
      Password: $Password
      IsAdmin: $IsAdmin
    ) {
      Firstname
      Lastname
      Email
      Phone
      Adress
      Password
      IsAdmin
    }
  }
`;
export default {
  Users,
  Login,
  Signup,
  Getme,
  UserUpdate,
  DeleteUser,
  CreateUser,
};
