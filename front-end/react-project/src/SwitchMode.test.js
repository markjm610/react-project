import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import { act } from 'react-dom/test-utils'
import Context from './Context'
import SwitchMode from './SwitchMode';

beforeEach(() => {
    fetch.resetMocks();
});

it('renders with context', () => {
    const context = {
        alphabetizing: false,
        setDisplayedColumns: () => { },
        integrationMode: false,
        setIntegrationMode: () => { },
        mainProjectArr: [],
        selectedProject: {},
        setSelectedProject: () => { },
        setProjectMembers: () => { },
        setCurrentProjectId: () => { },
        setUpdateColumns: () => { }
    }
    mount(<Context.Provider value={context}><SwitchMode /></Context.Provider>)
})

it('is disabled while alphabetizing', () => {
    const context = {
        alphabetizing: true,
        setDisplayedColumns: () => { },
        integrationMode: false,
        setIntegrationMode: () => { },
        mainProjectArr: [],
        selectedProject: {},
        setSelectedProject: () => { },
        setProjectMembers: () => { },
        setCurrentProjectId: () => { },
        setUpdateColumns: () => { }
    }
    const wrapper = mount(<Context.Provider value={context}><SwitchMode /></Context.Provider>)
    const tab = wrapper.find('.project-navlink')
    tab.simulate('click')
    expect(wrapper.find('Layer').length).toBe(0)
})


it('opens the layer on click and closes the layer on click outside', () => {
    const context = {
        alphabetizing: false,
        setDisplayedColumns: () => { },
        integrationMode: false,
        setIntegrationMode: () => { },
        mainProjectArr: [],
        selectedProject: {},
        setSelectedProject: () => { },
        setProjectMembers: () => { },
        setCurrentProjectId: () => { },
        setUpdateColumns: () => { }
    }
    const wrapper = mount(<Context.Provider value={context}><SwitchMode /></Context.Provider>)
    const tab = wrapper.find('.project-navlink')
    tab.simulate('click')
    expect(wrapper.find('Layer').length).toBe(1)
    const layer = wrapper.find('Layer')
    act(() => layer.prop('onClickOutside')())
    const newWrapper = mount(<Context.Provider value={context}><SwitchMode /></Context.Provider>)
    const newLayer = newWrapper.find('Layer')
    expect(newLayer.length).toBe(0)
})

// it('renders displayed columns', () => {
//     fetch.mockResponseOnce(JSON.stringify({ Columns: [] }))
//     const context = {
//         alphabetizing: false,
//         setDisplayedColumns: () => { },
//         integrationMode: false,
//         setIntegrationMode: () => { },
//         mainProjectArr: [],
//         selectedProject: {},
//         setSelectedProject: () => { },
//         setProjectMembers: () => { },
//         setCurrentProjectId: () => { },
//         setUpdateColumns: () => { }
//     }
//     const wrapper = mount(<Context.Provider value={context}><SwitchMode /></Context.Provider>)
// })