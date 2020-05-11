import React, { useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import Context from './Context';
import LogInAndSignUp from './LogInAndSignUp';
import Home from './Home';

function App() {

  const { appState: { currentUserId }, setAppState } = useContext(Context);

  useEffect(() => {
    console.log('setting')
    setAppState({
      authToken: localStorage.getItem('TOKEN'),
      currentUserId: localStorage.getItem('USER_ID')
    })
  }, [])


  return (
    <Switch>
      <ProtectedRoute path='/home' component={Home} currentUserId={currentUserId}></ProtectedRoute>
      <AuthRoute exact={true} path='/' component={LogInAndSignUp} currentUserId={currentUserId}></AuthRoute>
      <AuthRoute exact={true} path='/signup' component={LogInAndSignUp} currentUserId={currentUserId}></AuthRoute>
    </Switch>
  );
}

export default App;
