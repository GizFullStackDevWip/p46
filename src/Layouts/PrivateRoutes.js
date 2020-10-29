
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


const PrivateRoute = ({component: Component, ...rest}) => {
    const isLogin = useSelector((state) => state.login);
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLoggedIn ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;