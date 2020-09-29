import React from 'react'
import { shallow, mount } from 'enzyme';
import Invite from './Invite';
import Context from './Context'

it('renders with context', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: false
    }
    mount(<Context.Provider value={context}><Invite /></Context.Provider>)
})

it('is disabled while alphabetizing', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: true
    }
    const component = mount(<Context.Provider value={context}><Invite /></Context.Provider>)

})