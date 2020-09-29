import React from 'react'
import { shallow, mount } from 'enzyme';
import Invite from './Invite';
import Context from './Context'
import { Layer } from 'grommet';

it('renders with context', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: false
    }
    mount(<Context.Provider value={context}><Invite /></Context.Provider>)
})

it('shows the layer when the icon is clicked', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: false
    }
    const wrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
    const icon = wrapper.find('ShareOption')
    icon.simulate('click')
    expect(wrapper.find('Layer').length).toBe(1)
})

// it('sets different invite statuses based on response after submitting invite', () => {

// })

// it('displays different things based on invite status')

// it('resets form input value and invite status to empty string when closing the layer')
