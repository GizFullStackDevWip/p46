import React, { useState, useEffect } from 'react';
import { service } from './network/service';
import './App.css';
import Layouts from './Layouts/routes';
import Fingerprint2 from 'fingerprintjs2';
import { useSelector, useDispatch } from 'react-redux';



const App = () => {
  const dispatch = useDispatch();
  if (window.requestIdleCallback) {
    requestIdleCallback(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31);
        localStorage.setItem('deviceId', murmur);
      })
    })
  } else {
    setTimeout(function () {
      Fingerprint2.get(function (components) {
        var values = components.map(function (component) { return component.value })
        var murmur = Fingerprint2.x64hash128(values.join(''), 31);
        localStorage.setItem('deviceId', murmur);
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
        console.log('response api--->', response);
      })
    }).catch((error) => {
      service.analytics().then(response => {
        console.log('response api--->', response);
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
    let analyticsVal = service.getCookie('device_analytics');
    if (analyticsVal !== 'true') {
      fetchData();
    }

  }, []);
  return (
    <Layouts />
  );
}
export default App;
