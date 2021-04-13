import React, { useState, useContext, createContext } from "react";
import * as UserQuery from "../Apollo/Query/User";
import * as ProductsQuery from "../Apollo/Query/Product";
import Sign from "../components/ui/Sign/Sign";
import jwt_decode from "jwt-decode";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";
import db from "../config/db.config";
import Cookies from "universal-cookie";
const authContext = createContext();
// +-------------------------------------------------------------------+
// |  Context Provider
// +-------------------------------------------------------------------+
const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
};
const useAuth = () => {
  // -------------------------- USE CONTEXT
  return useContext(authContext);
};
const SignForm = () => {
  // -------------------------- GET SIGN FORM
  return <Sign></Sign>;
};
export { AuthProvider, useAuth, SignForm };

// +-------------------------------------------------------------------+
// |  Create Auth
// +-------------------------------------------------------------------+

const useProvideAuth = () => {
  // -------------------------- AUTH STATE
  const cookies = new Cookies();
  let x = null;
  let w = [];
  let z = [];

  if (cookies.get("token")) x = cookies.get("token");
  if (cookies.get("cart")) w = cookies.get("cart");
  if (cookies.get("wishlist")) z = cookies.get("wishlist");

  const [authToken, setAuthToken] = useState(x);

  const [userdata, setuserdata] = useState(null);

  const [Cart, setCart] = useState(w);

  const [wishlist, setwishlist] = useState(z);

  const getAuthHeaders = () => {
    if (authToken != null) return null;

    return {
      Authorization: authToken,
    };
  };

  const createApolloClient = () => {
    // -------------------------- CREATE APOLLO
    const link = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_GAID}/graphql`,
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };
  // +-------------------------------------------------------------------+
  // |  AUTH CALL
  // +-------------------------------------------------------------------+

  const Getme = async () => {
    if (authToken != null) {
      const x = await jwt_decode(authToken);
      const client = createApolloClient();
      const result = await client.query({
        query: UserQuery.default.Getme,
        variables: { id: x.id },
      });

      if (result?.data?.user) {
        setuserdata(result.data.user);
      }
    }
  };
  React.useEffect(() => {
    Getme();
  }, [authToken]);
  const signIn = async ({ Email, Password }) => {
    // -------------------------- SIGN IN

    const client = createApolloClient();
    try {
      const result = await client.query({
        query: UserQuery.default.Login,
        variables: { Email: Email, Password: Password },
      });

      if (result?.data?.login) {
        const cookies = new Cookies();
        cookies.set("token", result.data.login, { path: "/" });
        setAuthToken(result.data.login);
      }
    } catch (error) {
      return error.message;
    }
  };
  const signUp = async ({
    // -------------------------- SIGN UP
    Email,
    Password,
    Firstname,
    Lastname,
    Phone,
    Adress,
  }) => {
    try {
      const client = createApolloClient();
      const result = await client.mutate({
        mutation: UserQuery.default.Signup,
        variables: {
          Email: Email,
          Password: Password,
          Firstname: Firstname,
          Lastname: Lastname,
          Phone: Phone,
          Adress: Adress,
        },
      });

      if (result?.data?.signup) {
        setAuthToken(result.data.signup);
      }
    } catch (error) {
      return error.message;
    }
  };
  // +-------------------------------------------------------------------+
  // |  AUTH HELPER
  // +-------------------------------------------------------------------+

  const signOut = () => {
    // -------------------------- SIGN OUT
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    cookies.remove("cart", { path: "/" });
    cookies.remove("wishlist", { path: "/" });
    setAuthToken(null);
    setuserdata(null);
    setCart([]);
  };
  const Togglewishlist = (id) => {
    // -------------------------- ADD CART
    const cookies = new Cookies();
    if (wishlist != [] && cookies.get("wishlist")) {
      let w = cookies.get("wishlist");
      let z = w.indexOf(id);
      console.log(z);
      if (z != -1) {
        w.splice(z, 1);
      } else {
        w.push(id);
      }
      cookies.remove("wishlist");
      cookies.set("wishlist", w, { path: "/" });
      setwishlist(w);
    } else {
      console.log("nop");
      var p = [];
      p.push(id);
      cookies.set("wishlist", p, { path: "/" });
      setwishlist(p);
    }
  };
  const deletewishlist = () => {
    // -------------------------- ADD CART
    const cookies = new Cookies();
    if (wishlist != [] && cookies.get("wishlist")) {
      cookies.remove("wishlist");
      setwishlist([]);
    }
  };
  const AddCart = (data) => {
    // -------------------------- ADD CART
    const cookies = new Cookies();
    if (Cart != [] && cookies.get("cart")) {
      let w = cookies.get("cart");
      const isId = (element) => element.id === data.product.id;
      let z = w.findIndex(isId);
      if (z != -1) {
        w[z].qty += 1;
      } else {
        w.push({ id: data.product.id, qty: 1 });
      }
      cookies.remove("cart", { path: "/" });
      cookies.set("cart", w, { path: "/" });
      setCart(w);
    } else {
      var p = [];
      p.push({ id: data.product.id, qty: 1 });
      cookies.set("cart", p, { path: "/" });
      setCart(p);
    }
  };
  const removeCart = (data) => {
    // -------------------------- ADD CART
    const cookies = new Cookies();
    if (Cart != [] && cookies.get("cart")) {
      let w = cookies.get("cart");
      const isID = (element) => element.id === data.id;
      let z = w.findIndex(isID);
      if (z != -1 && w[z].qty > 1) {
        w[z].qty -= 1;
      } else {
        w.splice(z, 1);
      }
      cookies.remove("cart", { path: "/" });
      cookies.set("cart", w, { path: "/" });
      setCart(w);
    }
  };
  const deleteCart = () => {
    // -------------------------- ADD CART
    const cookies = new Cookies();
    if (Cart != [] && cookies.get("cart")) {
      cookies.remove("cart", { path: "/" });
      setCart([]);
    }
  };
  const GetCookies = () => {
    // -------------------------- GET COOKIES
    return jwt_decode(authToken);
  };

  const isSignedIn = () => {
    // -------------------------- IS SIGN IN
    if (authToken != null) {
      return true;
    } else {
      return false;
    }
  };

  return {
    useAuth,
    createApolloClient,
    signIn,
    signUp,
    signOut,
    isSignedIn,
    SignForm,
    Getme,
    AddCart,
    GetCookies,
    deleteCart,
    removeCart,
    Togglewishlist,
    deletewishlist,
    wishlist,
    Cart,
    userdata,
    authToken,
  };
};
