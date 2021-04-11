import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ key, path, component, protectedRoute=false }) => {
  return (
    <>
      {protectedRoute ? (
        localStorage.getItem("token") ? (
          <Route exact key={key} path={path} component={component} />
        ) : (
          <Redirect to="/"></Redirect>
        )
      ) : (
        <Route exact key={key} path={path} component={component} />
      )}
    </>
  );
};

export default ProtectedRoute;
