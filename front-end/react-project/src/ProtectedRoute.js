import React from 'react';
import { Route } from 'react-router-dom';

// Change component and redirect paths

const ProtectedRoute = ({ component: Component, path, currentUserId, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                currentUserId ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export default ProtectedRoute;