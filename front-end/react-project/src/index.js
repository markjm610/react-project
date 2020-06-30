import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import './index.css';
// import { Grommet } from 'grommet';

// import theme from './theme';
import ContextWrapper from './ContextWrapper';

ReactDOM.render(
  <DndProvider backend={Backend}>
    <BrowserRouter>
      <ContextWrapper />
    </BrowserRouter>
  </DndProvider>,
  document.getElementById('root')
);
