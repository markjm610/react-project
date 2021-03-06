import React from 'react'
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils'
import Invite from './Invite';
import Context from './Context'
import { Layer } from 'grommet';
import { jssPreset } from '@material-ui/core';
import { Escalator } from 'grommet-icons';

beforeEach(() => {
    fetch.resetMocks();
    jest.spyOn(window, 'fetch')
});


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

it('is disabled while alphabetizing', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: true
    }
    const wrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
    const icon = wrapper.find('ShareOption')
    icon.simulate('click')
    expect(wrapper.find('Layer').length).toBe(0)
})

it('opens the layer on click and closes the layer on click outside', () => {
    const context = {
        currentProjectId: 1,
        alphabetizing: false
    }
    const wrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
    const icon = wrapper.find('ShareOption')
    icon.simulate('click')
    const layer = wrapper.find('Layer')
    expect(layer.length).toBe(1)
    act(() => layer.prop('onClickOutside')())
    const newWrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
    const newLayer = newWrapper.find('Layer')
    expect(newLayer.length).toBe(0)
})

// it('displays different invite statuses based on response from submitting an invite', () => {
//     const context = {
//         currentProjectId: 1,
//         alphabetizing: false,
//         integrationMode: false
//     }
//     const wrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)

//     const icon = wrapper.find('ShareOption')
//     // act(() => {
//     icon.simulate('click')
//     // })
//     const popupContainer = wrapper.find('.popup-container')
//     expect(popupContainer.contains(<div className='popup-text'>Who would you like to invite?</div>)).toBe(true)
//     // expect(popupContainer.contains(<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', marginTop: '10px' }}>User not found</div>)).toBe(false)

//     // Mock response from fetch
//     fetch.mockResponseOnce(JSON.stringify({ message: 'already in project' }))

//     const input = popupContainer.find('input')

//     act(() => {
//         input.simulate('change', { target: { value: 'User' } })
//     })

//     const button = popupContainer.find('.popup-button')
//     act(() => {
//         button.simulate('click')
//     })
//     expect(fetch).toHaveBeenCalled()
//     const newWrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
//     // expect(newWrapper.contains(<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', marginTop: '10px' }}>User not found</div>)).toBe(true)
//     // const newPopupContainer = newWrapper.find('.popup-container')
//     expect(wrapper.contains(<div className='popup-text'>Who would you like to invite?</div>)).toBe(false)
//     expect(wrapper.contains(<div>User is already a member of this project.</div>)).toBe(true)
// })

// it('clears input value and invite status on click outside', () => {
//     const context = {
//         currentProjectId: 1,
//         alphabetizing: false
//     }
//     const wrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
//     const icon = wrapper.find('ShareOption')
//     icon.simulate('click')
//     const input = wrapper.find('input')
//     input.instance().value = 'Persontoinvite'
//     const layer = wrapper.find('Layer')
//     act(() => layer.prop('onClickOutside')())
//     const newWrapper = mount(<Context.Provider value={context}><Invite /></Context.Provider>)
//     const newInput = newWrapper.find('input')
//     expect(newInput.instance().value).toBe('')

// })