import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from 'grommet';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Demo from './Demo';

const LogInAndSignUp = () => {

    return (

        <Box className='log-in-sign-up-box'

            width='600px'
            height='600px'
            round='large'
        >
            <div className='title-div'><div className='title'>Taskflow</div></div>
            <Switch>
                <Route exact path='/' component={LogInForm}></Route>
                <Route exact path='/signup' component={SignUpForm}></Route>
                <Route exact path='/demo' component={Demo}></Route>

            </Switch>
        </Box >

    )
}

export default LogInAndSignUp;