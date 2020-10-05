import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import Context from './Context'
import ProjectMembers from './ProjectMembers'
import { ExpansionPanelActions } from '@material-ui/core';

it('renders with context', () => {
    const context = {
        integrationMode: false,
        projectMembers: [{ name: 'Test' }, { name: 'User' }, { name: 'Member' }]
    }
    mount(<Context.Provider value={context}><ProjectMembers /></Context.Provider>)
})

it('displays the list of project members', () => {
    const context = {
        integrationMode: false,
        projectMembers: [{ name: 'Test' }, { name: 'User' }, { name: 'Member' }]
    }
    const wrapper = mount(<Context.Provider value={context}><ProjectMembers /></Context.Provider>)
    expect(wrapper.contains(
        <div className='project-members'>
            <div key={'0Test'} className='each-member'>Test</div>
            <div key={'1User'} className='each-member'>User</div>
            <div key={'2Member'} className='each-member'>Member</div>
        </div>
    )).toBe(true)
})

it('displays a message instead of a user list when in integration mode', () => {
    const context = {
        integrationMode: true,
        projectMembers: [{ name: 'Test' }, { name: 'User' }, { name: 'Member' }]
    }
    const wrapper = mount(<Context.Provider value={context}><ProjectMembers /></Context.Provider>)
    expect(wrapper.contains(
        <div className='project-members'>
            <div key={'0Test'} className='each-member'>Test</div>
            <div key={'1User'} className='each-member'>User</div>
            <div key={'2Member'} className='each-member'>Member</div>
        </div>
    )).toBe(false)
    expect(wrapper.contains(
        <div className='project-members'>
            <div className='integration-description'>Changes to this project are reflected on <a href="https://trello.com/b/VlAlibRo/taskflow" target="_blank" rel="noopener noreferrer">this board</a>.</div>
            <div className='integration-description'>Add things, move things around, and check the Trello board to see your changes.</div>
        </div>
    )).toBe(true)
})
