import React from 'react'
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils'
import Invite from './Invite';
import Context from './Context'
import ControlSpeed from './ControlSpeed';
import { Play, FastForward, Rewind } from 'grommet-icons'

it('renders with context', () => {
    const context = {
        setScriptSpeed: () => { }
    }
    mount(<Context.Provider value={context}><ControlSpeed /></Context.Provider>)
})

it('highlights selected speed icon', () => {
    const context = {
        setScriptSpeed: () => { }
    }
    const wrapper = mount(<Context.Provider value={context}><ControlSpeed /></Context.Provider>)
    const slow = wrapper.find('#slow-button')
    slow.simulate('click')
    expect(wrapper.contains(<Rewind color='white' />)).toBe(true)
    expect(wrapper.contains(<Play color='white' />)).toBe(false)
    expect(wrapper.contains(<FastForward color='white' />)).toBe(false)
    const medium = wrapper.find('#medium-button')
    medium.simulate('click')
    expect(wrapper.contains(<Rewind color='white' />)).toBe(false)
    expect(wrapper.contains(<Play color='white' />)).toBe(true)
    expect(wrapper.contains(<FastForward color='white' />)).toBe(false)
    const fast = wrapper.find('#fast-button')
    fast.simulate('click')
    expect(wrapper.contains(<Rewind color='white' />)).toBe(false)
    expect(wrapper.contains(<Play color='white' />)).toBe(false)
    expect(wrapper.contains(<FastForward color='white' />)).toBe(true)
})