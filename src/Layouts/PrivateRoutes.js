import React, { useEffect } from "react";
import {
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { service } from "../network/service";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.login);
  let location = useLocation();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  let userId = service.getCookie("userId");

  useEffect(() => {
    if (location.pathname === "/tv") {
      localStorage.setItem("location", "/tv");
    }
  }, []);
  // localStorage.setItem('location',location.pathname);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === "true" && userId ? (
          <Component {...props} />
        ) : location.pathname === "/tv" ? (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
