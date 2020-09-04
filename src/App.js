import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Home from './components/Home/Home';
import { service } from './network/service';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Layouts from './Layouts/routes';

const App = () => {
  useEffect(() => {
    service.authenticate().then(response => { })
  }, []);
  return (
    <Router>
      <Switch>
        <Route   path='/' component={Layouts} />
      </Switch>
    </Router>
  );
}
export default App;
