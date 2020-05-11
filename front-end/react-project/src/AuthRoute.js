import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Change component and redirect paths if needed

const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                currentUserId ? <Redirect to="/home" /> : <Component {...props} />
            }
        />
    );
};

export default AuthRoute;