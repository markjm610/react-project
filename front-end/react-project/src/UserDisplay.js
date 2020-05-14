import React, { useContext, useState } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { Notification } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';

const UserDisplay = () => {
    const { invites, setInvites, currentUserId } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });
    const clickNotification = () => {
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
        // console.log(spliceId)
        // console.log(invitesCopy);
        setInvites(invitesCopy)

        await fetch(`${apiBaseUrl}/usersprojects`, {
            method: 'POST',
            body: JSON.stringify({ inviteId: invite.id, userId: currentUserId, projectId: invite.Project.id }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
        // if (res.ok) {

        // }

    }

    return (
        <div className='user-display'>
            <div className='user-profile-picture'>Profile picture goes here</div>
            {invites[0] && <div><Notification className='notification-icon' onClick={clickNotification}></Notification></div>}
            {show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                >   {invites.map(invite => {
                    return (
                        <>
                            <div className='invite-message'>
                                {invite.inviteSender} invited you to {invite.Project.name}
                            </div>
                            <Button onClick={() => acceptInvite(invite)} primary label="Join project" />
                        </>)
                })}
                </Layer>
            )}
        </div>
    )
}

export default UserDisplay;