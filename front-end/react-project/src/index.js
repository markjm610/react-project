import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Grommet } from 'grommet';

import theme from './theme';
import ContextWrapper from './ContextWrapper';

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme}>
      <BrowserRouter>
        <ContextWrapper />
      </BrowserRouter>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
