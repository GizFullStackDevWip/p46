import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Movies from '../components/Movies/Movies';
import CategoryList from '../components/CategoryList/CategoryList';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Series from '../components/Series/Series';
import AboutUs from '../components/FooterComponents/AboutUs/AboutUs';
const routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home/movies" exact component={Movies} />
            <Route path="/home/categorylist" exact component={CategoryList} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/register" exact component={Register} />
            <Route path="/home/series" exact component={Series} />
            <Route path="/aboutus" exact component={AboutUs} />

        </Switch>
    </Router>

);
export default routes;