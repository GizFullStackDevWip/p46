import React, { useState, useEffect } from 'react';
import { service } from './network/service';
import { Link, useHistory } from 'react-router-dom';
import './App.css';
import Layouts from './Layouts/routes';

import Fingerprint2 from 'fingerprintjs2';
import { getSessionId } from './Utils/utils';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  if (window.requestIdleCallback) {
    requestIdleCallback(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31);
        localStorage.setItem('deviceId', murmur);
        service.getGeoInfo().then(response => {
          service.setCookie("country_code", response.country, 30);
        })
      })
    })
  } else {
    setTimeout(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31);
        localStorage.setItem('deviceId', murmur);
        service.getGeoInfo().then(response => {
          service.setCookie("country_code", response.country, 30);
        })
      })
    }, 500)
  }
  async function fetchData() {
    await service.getLocation().then(response => {
      let currentLocation = {}
      currentLocation['country_name'] = response.data.country_name
      currentLocation['city'] = response.data.city
      currentLocation['latitude'] = response.data.latitude
      currentLocation['longitude'] = response.data.longitude
      currentLocation['IPv4'] = response.data.IPv4
      currentLocation['state'] = response.data.state
      localStorage.setItem('currentLocation', JSON.stringify(currentLocation));
      service.analytics().then(response => {
      })
    }).catch((error) => {
      service.analytics().then(response => {
      })
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
    // console.log('userEmail', analyticsVal, userEmail);
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
  return (
    
      <Layouts />
  );
}
export default App;
