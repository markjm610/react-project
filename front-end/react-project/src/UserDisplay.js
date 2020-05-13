import React, { useContext, useEffect } from 'react';
import Context from './Context';
import { Notification } from 'grommet-icons';

const UserDisplay = () => {
    const { appState, setAppState } = useContext(Context);
    // Need some way to check for notifications
    useEffect(() => {
        async function checkInvites() {
            const res = await fetch('')
            const parsedRes = await res.json()
            if ('there is an invite') {
                setAppState({ ...appState, invites: [] })
            }
        }
        // checkInvites()
    }, [])
    return (
        <div className='user-display'>
            <div className='user-profile-picture'>Profile picture goes here</div>
            {/* {appState.invites && <div><Notification></Notification></div>} */}
        </div>
    )
}

export default UserDisplay;