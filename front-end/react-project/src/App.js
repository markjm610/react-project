import React, { useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import Context from './Context';
import LandingPage from './LandingPage';
import Home from './Home';

function App() {


  const { setAuthToken, currentUserId, setCurrentUserId } = useContext(Context);

  useEffect(() => {
    // console.log('setting')
    // setAppState({
    //   ...appState,
    //   authToken: localStorage.getItem('TOKEN'),
    //   currentUserId: localStorage.getItem('USER_ID')
    // })

    setAuthToken(localStorage.getItem('TOKEN'));
    setCurrentUserId(localStorage.getItem('USER_ID'));

  }, [])


  return (
    <Switch>
      <ProtectedRoute path='/home' component={Home} currentUserId={currentUserId}></ProtectedRoute>
      <AuthRoute exact={true} path='/' component={LandingPage} currentUserId={currentUserId}></AuthRoute>
      <AuthRoute exact={true} path='/signup' component={LandingPage} currentUserId={currentUserId}></AuthRoute>
      <AuthRoute exact={true} path='/demo' component={LandingPage} currentUserId={currentUserId}></AuthRoute>
    </Switch>
  );
}

export default App;
