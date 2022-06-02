//sign out of all device

import React, { useState } from "react";
import { service } from "./service";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./signout.css";

const Signout = () => {
  const [signOutStatus, setSignOutStatus] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignOutClick = () => {
    let user_id = service.getCookie("userId");
    service.logoutAll(user_id).then((response) => {
      if (response.success === true) {
        setSignOutStatus(true);
        setTimeout(() => {
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          localStorage.setItem("isLoggedIn", "false");
          dispatch({ type: "LOGOUT" });
          eraseCookie("userName");
          eraseCookie("userId");
          document.cookie =
            "userId" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          eraseCookie("userEmail");
          eraseCookie("subscriptionId");
          eraseCookie("subId");
          eraseCookie("showId");
          eraseCookie("isLoggedIn");
          history.push({
            pathname: "/",
          });
        }, 1000);
      }
    });
  };
  const eraseCookie = (name) => {
    document.cookie = name + "=; Max-Age=-99999999;";
  };
  return (
    <div
      id="appMountPoint"
      className="searchPageMain"
      style={{ paddingTop: "115px", paddingBottom: "1px" }}
    >
      <div style={{ padding: "50px" }}>
        <div className="responsive-account-container">
          <form method="POST" action="#">
            <h3 className="signOutHeading">Sign Out of All Devices</h3>
            <p className="subText">Are you sure to sign out of all devices?</p>

            <div className="btn-bar btn-bar-left" data-uia="btn-submit">
              <button
                // className="btn btn-blue btn-small"
                className="signOutButton"
                type="button"
                onClick={handleSignOutClick}
                style={{ width: "95px" }}
                // autoComplete="off"
                // tabindex="0"
                // data-uia="btn-sign-out"
                // onclick="Logoutall()"
              >
                Sign Out
              </button>
              <a href="/account">
                <button
                  className="cancelButton"
                  style={{ width: "90px" }}
                  // className="btn btn-plain btn-small"
                  // onclick="cancel()"
                  type="button"
                  // autoComplete="off"
                  // tabindex="0"
                  // data-uia="btn-cancel"
                >
                  Cancel
                </button>
              </a>
            </div>
          </form>
          {signOutStatus ? (
            <div
              className="row d-flex justify-content-center"
              style={{ margin: "30px" }}
            >
              <div className="alert alert-warning col-md-8" role="alert">
                <h4 className="alert-heading"></h4>
                <p>Logged out successfully</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Signout;
