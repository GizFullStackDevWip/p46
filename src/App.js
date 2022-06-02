import React, { useState, useEffect } from "react";
// import "./App.css";
import "./App.css";
// import "./App.scss";
import Fingerprint2 from "fingerprintjs2";
import { getSessionId } from "./Utils/utils";
import { service } from "./network/service";
import Layouts from "./Layouts/routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let urlParams = new URLSearchParams(window.location.search);
  let androidToken = urlParams.get("antkn");
  if (androidToken) {
    localStorage.removeItem("userId");
    service.setCookie("isLoggedIn", false, 30);
    localStorage.removeItem("isLoggedIn");
    service.eraseCookie("userId");
    service.eraseCookie("userEmail");
  }

  useEffect(() => {
    if (!isAuthenticated) {
      if (service.getCookie("userId") == null) {
        if (localStorage.getItem("deviceId")) {
          service.getGeoInfo().then((response) => {
            service.getGuestUser().then((response) => {
              if (response) {
                service.authenticate().then((response) => {
                  if (response.token) {
                    setIsAuthenticated(true);
                  }
                });
              }
            });
          });
        } else {
          Fingerprint2.get(function (components) {
            var values = components.map(function (component) {
              return component.value;
            });
            var murmur = Fingerprint2.x64hash128(values.join(""), 31);
            localStorage.setItem("deviceId", murmur);
            service.getGeoInfo().then((response) => {
              service.getGuestUser().then((response) => {
                if (response) {
                  service.authenticate().then((response) => {
                    if (response.token) {
                      setIsAuthenticated(true);
                    }
                  });
                }
              });
            });
          });
        }
      } else {
        if (localStorage.getItem("deviceId")) {
          service.getGeoInfo().then((response) => {
            service.authenticate().then((response) => {
              if (response.token) {
                setIsAuthenticated(true);
              }
              getSessionId();
              if (
                !localStorage.getItem("deviceAnalytics") &&
                service.getCookie("userId") != null &&
                service.getCookie("guestUserId") != service.getCookie("userId")
              ) {
                service.analytics().then((response) => {
                  localStorage.setItem("deviceAnalytics", true);
                });
              }

              if (
                !sessionStorage.getItem("applaunch") &&
                localStorage.getItem("isLoggedIn") == "true"
              ) {
                service.applaunchEvent("POP01").then((response) => {});
              }
            });
          });
        } else {
          Fingerprint2.get(function (components) {
            var values = components.map(function (component) {
              return component.value;
            });
            var murmur = Fingerprint2.x64hash128(values.join(""), 31);
            localStorage.setItem("deviceId", murmur);

            service.getGeoInfo().then((response) => {
              service.authenticate().then((response) => {
                if (response.token) {
                  setIsAuthenticated(true);
                }
                getSessionId();
                if (
                  !localStorage.getItem("deviceAnalytics") &&
                  service.getCookie("userId") != null &&
                  service.getCookie("guestUserId") !=
                    service.getCookie("userId")
                ) {
                  service.analytics().then((response) => {
                    localStorage.setItem("deviceAnalytics", true);
                  });
                }
                if (
                  !sessionStorage.getItem("applaunch") &&
                  localStorage.getItem("isLoggedIn") == "true"
                ) {
                  service.applaunchEvent("POP01").then((response) => {});
                }
              });
            });
          });
        }
      }
    }
  }, []);
  return <div>{isAuthenticated && <Layouts />}</div>;
}

export default App;
