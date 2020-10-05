import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getLoggedIn } from '../../reducers/authentication.reducer';

function PrivateRoute({ component: Component, roles, ...rest }) {
  const loggedIn = useSelector(getLoggedIn);

    return (
        <Route {...rest} render={props => {
            if (!loggedIn) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;