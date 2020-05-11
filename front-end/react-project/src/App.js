import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AuthRoute from './AuthRoute';
import { Box } from 'grommet';
import ProtectedRoute from './ProtectedRoute';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Context from './Context';
import LogInAndSignUp from './LogInAndSignUp';

function App() {

  const { appState: { currentUserId }, setAppState } = useContext(Context);

  if (currentUserId === '') {
    setAppState({
      authToken: localStorage.getItem('TOKEN'),
      currentUserId: localStorage.getItem('USER_ID')
    })
  }

  return (
    <Switch>
      <AuthRoute exact={true} path='/' component={LogInAndSignUp} currentUserId={currentUserId}></AuthRoute>
    </Switch>
  );
}

export default App;
