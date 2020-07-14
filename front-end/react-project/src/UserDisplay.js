import React, { useContext, useState } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { Notification, UserAdd } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';

const UserDisplay = () => {
    const { invites, setInvites, currentUserId, mainProjectArr, listProjectArr } = useContext(Context);
    const [show, setShow] = useState();
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

        setInvites(invitesCopy)

        const totalProjectArr = [...mainProjectArr, ...listProjectArr]


        await fetch(`${apiBaseUrl}/usersprojects`, {
            method: 'POST',
            body: JSON.stringify({ inviteId: invite.id, userId: currentUserId, projectId: invite.Project.id, position: totalProjectArr.length }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
        // if (res.ok) {

        // }

    }



    return (
        <div className='user-display'>

            {invites[0] && <div className='notification-icon-container'><Notification
                color='white'
                className='notification-icon' onClick={clickNotification}></Notification>
                <div className='invite-message'>You have {invites.length} invite{invites.length !== 1 ? 's' : ''}!</div>
            </div>}
            {show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => setShow(false)}
                >   {invites.map(invite => {
                    return (
                        <React.Fragment key={invite.id}>
                            <div className='invite-message'>
                                {invite.inviteSender} invited you to a project: {invite.Project.name}
                            </div>
                            <Button onClick={() => acceptInvite(invite)} color='lightsteelblue' primary label="Join project" />
                        </React.Fragment>)
                })}
                </Layer>
            )}
        </div>
    )
}

export default UserDisplay;