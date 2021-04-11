import React, { useState } from "react";
const UserContext = React.createContext();

const UserProviderContext = ({
  children,
  UserSelected = { id: "000000", auth: false, cart: {} },
}) => {
  const [User, setUser] = useState(UserSelected);
  const SetAuth = (data) => {
    setUser({...User,auth:data});
  };

  const Setid = (data) => {

    setUser({...User,id:data});
  };

  const SetCart = (data) => {
    var x = User;
    x.Cart = data;
    setUser(x);
  };

  const UserClear = () => {
    var x = { id: "", auth: false, cart: {} };
    setUser(x);
  };
  const getUser = () => {
    return User;
  };

  return (
    <UserContext.Provider
      value={{ ...User, Setid, SetAuth, SetCart, UserClear, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProviderContext, UserContext as default };
