import React, { useContext, useState } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { Notification, UserAdd, FormCheckmark, FormClose } from 'grommet-icons';

import Context from './Context';
import { apiBaseUrl } from './config';

const UserDisplay = () => {
    const { invites, setInvites, currentUserId, mainProjectArr, listProjectArr } = useContext(Context);
    const [show, setShow] = useState();
    const [clickedButton, setClickedButton] = useState(false)
    const [allowAccept, setAllowAccept] = useState(false)

    const clickNotification = (e) => {

        setShow(true)
    }

    const acceptInvite = async (invite) => {


        setShow(false)

        let invitesCopy = [...invites];
        let spliceId;
        invitesCopy.forEach((inviteCopy, i) => {
            if (inviteCopy.id === invite.id) {
                spliceId = i;
            }
        })
        invitesCopy.splice(spliceId, 1)

        setInvites(invitesCopy)

        const totalProjectArr = [...mainProjectArr, ...listProjectArr]


        await fetch(`${apiBaseUrl}/usersprojects`, {
            method: 'POST',
            body: JSON.stringify({ inviteId: invite.id, userId: currentUserId, projectId: invite.Project.id, position: totalProjectArr.length }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
    }

    const rejectInvite = async invite => {
        setShow(false)

        let invitesCopy = [...invites];
        let spliceId;
        invitesCopy.forEach((inviteCopy, i) => {
            if (inviteCopy.id === invite.id) {
                spliceId = i;
            }
        })
        invitesCopy.splice(spliceId, 1)

        setInvites(invitesCopy)

        await fetch(`${apiBaseUrl}/invites/${invite.id}`, {
            method: 'DELETE'
        })
    }



    return (
        <>
            {invites[0] && <div className='user-display'>
                <div className='notification-icon-container'>
                    <Notification
                        color='white'
                        className='notification-icon'
                        onClick={clickNotification}
                    />
                    <div className='invite-message'>
                        You have {invites.length} invite{invites.length !== 1 ? 's' : ''}!
                    </div>
                </div>

            </div>}


            {show && <Layer
                onEsc={() => setShow(false)}
                onClickOutside={() => {
                    setClickedButton(false)
                    setShow(false)
                }}>
                <div className='popup-container'>
                    {invites.map(invite => {
                        return (
                            <div key={invite.id} className='invite-popup-container'>
                                <div className='accept-invite-text'>
                                    {invite.inviteSender} invited you to a project: {invite.Project.name}
                                </div>
                                <div className='invite-buttons'>
                                    <div
                                        className='accept-invite'
                                        onClick={() => acceptInvite(invite)}
                                    >
                                        <FormCheckmark />
                                    </div>
                                    <div className='reject-invite' onClick={() => rejectInvite(invite)}>
                                        <FormClose />
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </Layer>}
        </>
    )
}

export default UserDisplay;