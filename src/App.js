import React, { useState, useEffect } from 'react';
import { service } from './network/service';
import './App.css';
import Layouts from './Layouts/routes';
import Fingerprint2 from 'fingerprintjs2';

const App = () => {
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
  useEffect(() => {
    var currentURL = new URL(window.location.href);
    var key = currentURL.searchParams.get("key");
    service.authenticate();
    if (key) {
      service.keyAuthenticate(key);
    }
  }, []);
  return (
    <Layouts />
  );
}
export default App;
