import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const isLogin = useSelector((state) => state.login);
    let isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLoggedIn && restricted ?
                <Redirect to="/home" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;