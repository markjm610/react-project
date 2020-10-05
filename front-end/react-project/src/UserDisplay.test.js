import React from 'react'
import { shallow, mount, render, configure } from 'enzyme';
import { act } from 'react-dom/test-utils'
import Context from './Context'
import ContextWrapper from './ContextWrapper'
import UserDisplay from './UserDisplay';
import Notification from 'grommet-icons';

beforeEach(() => {
    fetch.resetMocks();
    jest.spyOn(window, 'fetch')
});

it('renders with context', () => {
    const context = {
        invites: [],
        setInvites: () => { },
        currentUserId: 1,
        mainProjectArr: [],
        listProjectArr: [],
        alphabetizing: false
    }
    mount(<Context.Provider value={context}><UserDisplay /></Context.Provider>)
})

it('does not show anything when there are no pending invites', () => {
    const context = {
        invites: [],
        setInvites: () => { },
        currentUserId: 1,
        mainProjectArr: [],
        listProjectArr: [],
        alphabetizing: false
    }
    const wrapper = mount(<Context.Provider value={context}><UserDisplay /></Context.Provider>)
    expect(wrapper.contains(
        <div className='invite-message'>
            You have 0 invites!
        </div>
    )).toBe(false)
})

it('shows a message when when there is at least one pending invite', () => {
    const context = {
        invites: [{
            id: 10,
            inviteReceiver: 1,
            inviteSender: 'Other user',
            projectId: 20,
            Project: {
                name: 'Project',
                id: 20
            }
        }],
        setInvites: () => { },
        currentUserId: 1,
        mainProjectArr: [],
        listProjectArr: [],
        alphabetizing: false
    }

    const wrapper = mount(<Context.Provider value={context}><UserDisplay /></Context.Provider>)
    expect(wrapper.contains(
        <div className='invite-message'>
            You have 1 invite!
        </div>
    )).toBe(true)
})

it('displays a popup message when the notification icon is clicked', () => {
    const context = {
        invites: [{
            id: 10,
            inviteReceiver: 1,
            inviteSender: 'Other user',
            projectId: 20,
            Project: {
                name: 'Project',
                id: 20
            }
        }],
        setInvites: () => { },
        currentUserId: 1,
        mainProjectArr: [],
        listProjectArr: [],
        alphabetizing: false
    }

    const wrapper = mount(<Context.Provider value={context}><UserDisplay /></Context.Provider>)
    const notificationIcon = wrapper.find('Notification')
    notificationIcon.simulate('click')
    expect(wrapper.contains(
        <div className='accept-invite-text'>
            Other user invited you to a project: Project
        </div>
    )).toBe(true)
})

// it('can accept one invite, closing popup and removing notification icon', () => {
//     fetch.mockResponseOnce(JSON.stringify('deleted'))
//     const context = {
//         invites: [{
//             id: 10,
//             inviteReceiver: 1,
//             inviteSender: 'Other user',
//             projectId: 20,
//             Project: {
//                 name: 'Project',
//                 id: 20
//             }
//         }],
//         setInvites: () => { },
//         currentUserId: 1,
//         mainProjectArr: [],
//         listProjectArr: [],
//         alphabetizing: false
//     }

//     const wrapper = mount(<Context.Provider value={context}><UserDisplay /></Context.Provider>)
//     expect(wrapper.contains(
//         <div className='invite-message'>
//             You have 1 invite!
//         </div>
//     )).toBe(true)
//     const notificationIcon = wrapper.find('Notification')
//     notificationIcon.simulate('click')
//     const accept = wrapper.find('.accept-invite')
//     accept.simulate('click')
//     expect(wrapper.contains(
//         <div className='accept-invite-text'>
//             Other user invited you to a project: Project
//         </div>
//     )).toBe(false)
//     expect(wrapper.contains(
//         <div className='invite-message'>
//             You have 1 invite!
//         </div>
//     )).toBe(false)
// })

// it('can reject an invite', () => {

// })