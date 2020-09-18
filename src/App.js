import React, { useState, useEffect } from 'react';
import { service } from './network/service';
import './App.css';
import Layouts from './Layouts/routes';

const App = () => {
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
