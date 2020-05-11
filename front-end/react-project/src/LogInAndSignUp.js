import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import { Box } from 'grommet';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Context from './Context';

const LogInAndSignUp = () => {

    const { appState: { currentUserId } } = useContext(Context);


    return (
        <Box border={{
            "color": "lightblue",
            "size": "medium",
            "style": "solid",
            "side": "all"
        }} width='600px'
            height='600px'
            round='large'
        >
            <Switch>
                <Route exact path='/' component={LogInForm}></Route>
                <Route exact path='/signup' component={SignUpForm}></Route>
                {/* <AuthRoute exact={true} path='/' component={LogInForm} currentUserId={currentUserId}></AuthRoute>
                <AuthRoute exact={true} path='/signup' component={SignUpForm} currentUserId={currentUserId}></AuthRoute> */}
            </Switch>
        </Box>
    )
}

export default LogInAndSignUp;