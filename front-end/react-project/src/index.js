import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Grommet } from 'grommet';
import App from './App';
import theme from './grommet/theme';

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
