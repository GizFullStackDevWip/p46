import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import GetVideos from '../components/GetVideos/GetVideos';
const routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/components/getvideo" exact component={GetVideos} />
        </Switch>
    </Router>

);
export default routes;