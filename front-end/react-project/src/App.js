import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import AuthRoute from './AuthRoute';
import { Box } from 'grommet';
import ProtectedRoute from './ProtectedRoute';
import SidebarComponent from './grommet/Sidebar';
import GridContainer from './grommet/Grid';
import LogInForm from './grommet/LogInForm';
import SignUpForm from './grommet/SignUpForm';

function App() {
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
        <Route path='/signup' component={SignUpForm}></Route>
      </Switch>
    </Box>
  );
}

export default App;
