import React, { useState, useEffect } from 'react';
import { service } from './network/service';
import './App.css';
import Layouts from './Layouts/routes';

const App = () => {
  useEffect(() => {
    service.authenticate().then(response => { })
  }, []);
  return (
    <Layouts/>
  );
}
export default App;
