import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'js-cookie';

import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, roles, ...rest }) {

    return (
        <Route {...rest} render={props => {
            if (!cookie.get('token')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;