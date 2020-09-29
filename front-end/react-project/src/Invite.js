import React, { useState, useContext } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption, Checkmark } from 'grommet-icons';
import { apiBaseUrl } from './config';
import Context from './Context';
import Tooltip from '@material-ui/core/Tooltip';

const Invite = () => {
    const { currentProjectId, alphabetizing } = useContext(Context);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const [showConfirm, setShowConfirm] = useState()
    const [inviteStatus, setInviteStatus] = useState('')
    const [clickedButton, setClickedButton] = useState(false)

    const submitInvite = async (e) => {
        e.preventDefault()
        setClickedButton(true)

        if (value === '') {
            return
        }


        const findRes = await fetch(`${apiBaseUrl}/users`, {
            method: 'PUT',
            body: JSON.stringify({ name: value, projectId: currentProjectId }),
            headers: {
                "Content-Type": 'application/json',
            }
        })


        const parsedFindRes = await findRes.json();
        if (parsedFindRes.message === 'already in project') {

            setInviteStatus('already in project')
        } else if (parsedFindRes.user) {
            const inviteId = parsedFindRes.user.id;
            const projectId = currentProjectId;
            const name = localStorage.getItem('USER_NAME');

            const sendInviteRes = await fetch(`${apiBaseUrl}/users/invites`, {
                method: 'PUT',
                body: JSON.stringify({ inviteReceiver: inviteId, inviteSender: name, projectId }),
                headers: {
                    "Content-Type": 'application/json',
                }
            })
            const parsedSendInviteRes = await sendInviteRes.json()

            if (parsedSendInviteRes.message === 'already invited') {
                setInviteStatus('already invited')

            } else if (sendInviteRes.ok) {
                setInviteStatus('sent')
            }
        } else {
            setInviteStatus('user not found')
        }
    }

    return (
        <>
            {currentProjectId &&

                <div className='invite'>
                    <Tooltip title='Invite' arrow placement='top'>
                        <div>
                            <ShareOption
                                color='black'
                                className='invite-icon'
                                onClick={() => {
                                    if (alphabetizing) {
                                        return
                                    }
                                    setShow(true)
                                }
                                } />
                        </div>
                    </Tooltip>
                </div>
            }
            {show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setClickedButton(false)
                        setValue('')
                        setInviteStatus('')
                    }}
                >
                    <div className='popup-container'>
                        {(!inviteStatus || inviteStatus === 'user not found') &&
                            <>
                                <div className='popup-text'>Who would you like to invite?</div>
                                <form onSubmit={submitInvite}>
                                    <input
                                        className='popup-input'
                                        value={value}
                                        onChange={e => {
                                            if (inviteStatus === 'user not found') {
                                                setInviteStatus(null)
                                            }
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                            setValue(e.target.value)
                                        }}
                                        onFocus={() => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={submitInvite}>Invite</div>
                                        {inviteStatus === 'user not found' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', marginTop: '10px' }}>User not found</div>}
                                    </div>
                                </form>
                            </>
                        }
                        {inviteStatus === 'sent' &&
                            <>
                                <div>Invite sent!</div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}><Checkmark /></div>
                            </>}
                        {inviteStatus === 'already invited' &&

                            <div>It looks like you've already invited {value} to this project.</div>
                        }
                        {inviteStatus === 'already in project' &&

                            <div>{value} is already a member of this project.</div>
                        }
                    </div>
                </Layer>
            )
            }
        </>)


}

export default Invite;