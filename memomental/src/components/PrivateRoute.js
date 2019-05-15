import React from 'react';
import API from '../utils/auth.js';
import { Route, Redirect } from 'react-router-dom';

// this const verify if the token is good or not
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => {
        var path = props.location.pathname;
        if(API.isAuth()===false){
            return(<Redirect to='/' />)
        }
        else{
            return( <Component {...props} /> )
        }
    }} />
);