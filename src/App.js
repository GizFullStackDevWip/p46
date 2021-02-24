import React, { useState, useEffect } from "react";
import { service } from "./network/service";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
import Layouts from "./Layouts/routes";

import Fingerprint2 from "fingerprintjs2";
import { getSessionId } from "./Utils/utils";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  if (window.requestIdleCallback) {
    requestIdleCallback(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) {
          return component.value;
        });
        var murmur = Fingerprint2.x64hash128(values.join(""), 31);
        localStorage.setItem("deviceId", murmur);
        service.getGeoInfo().then((response) => {
          console.log(response, "reposen of country coe");
          if (response) {
            service.setCookie("country_code", response.country, 30);
            localStorage.setItem("ipaddress", response.ip);
          }
        });
      });
    });
  } else {
    setTimeout(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) {
          return component.value;
        });
        var murmur = Fingerprint2.x64hash128(values.join(""), 31);
        localStorage.setItem("deviceId", murmur);
        service.getGeoInfo().then((response) => {
          if (response) {
            service.setCookie("country_code", response.country, 30);
            localStorage.setItem("ipaddress", response.ip);
          }
        });
      });
    }, 500);
  }
  async function fetchData() {
    await service
      .getLocation()
      .then((response) => {
        let currentLocation = {};
        currentLocation["country_name"] = response.data.country;
        currentLocation["country_code"] = response.data.countryCode;
        currentLocation["city"] = response.data.city;
        currentLocation["latitude"] = response.data.lat;
        currentLocation["longitude"] = response.data.lon;
        currentLocation["IPv4"] = response.data.query;
        currentLocation["state"] = response.data.region;
        localStorage.setItem(
          "currentLocation",
          JSON.stringify(currentLocation)
        );
        service.analytics().then((response) => {});
      })
      .catch((error) => {
        service.analytics().then((response) => {});
      });
  }
  useEffect(() => {
    var currentURL = new URL(window.location.href);
    var key = currentURL.searchParams.get("key");
    service.authenticate();
    if (key) {
      service.keyAuthenticate(key);
    }
    // let analyticsVal = service.getCookie('device_analytics');
    // let userEmail = service.getCookie('userEmail');
    // let userId = service.getCookie('userId');
    // if (userEmail && userId) {
    //   if (analyticsVal) {
    //     if (analyticsVal === null) {
    //       fetchData();
    //     }
    //   } else {
    //     fetchData();
    //   }
    // }
    getSessionId();
  }, []);
  return <Layouts />;
};
export default App;
