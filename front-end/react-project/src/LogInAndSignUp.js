import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from 'grommet';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

const LogInAndSignUp = () => {

    return (

        <Box className='log-in-sign-up-box'
            // border={{
            //     "color": "lightblue",
            //     "size": "medium",
            //     "style": "solid",
            //     "side": "all"
            // }} 
            width='600px'
            height='600px'
            round='large'
        >
            <div className='title-div'><div className='title'></div></div>
            <Switch>
                <Route exact path='/' component={LogInForm}></Route>
                <Route exact path='/signup' component={SignUpForm}></Route>
                {/* <AuthRoute exact={true} path='/' component={LogInForm} currentUserId={currentUserId}></AuthRoute>
                <AuthRoute exact={true} path='/signup' component={SignUpForm} currentUserId={currentUserId}></AuthRoute> */}
            </Switch>
        </Box >

    )
}

export default LogInAndSignUp;