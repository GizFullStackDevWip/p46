import React from "react";
import { Route, Redirect,Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.login);
  let location = useLocation();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log('location.state.from.pathname',location.pathname);
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          location.pathname === '/tv' ?
          <Redirect
            to={{ pathname: "/register", state: { from: props.location } }}
          />
          :
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
