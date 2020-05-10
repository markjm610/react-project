import React from 'react';
import { Route } from 'react-router-dom';

// Change component and redirect paths

const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                currentUserId ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default AuthRoute;