import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import { act } from 'react-dom/test-utils'
import Context from './Context'
import ContextWrapper from './ContextWrapper'
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    mount(<BrowserRouter><ContextWrapper /></BrowserRouter>)
})