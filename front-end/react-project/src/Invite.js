import React, { useState, useContext } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption, Checkmark } from 'grommet-icons';
import { apiBaseUrl } from './config';
import Context from './Context';

const Invite = () => {
    const { currentProjectId } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });
    const [showConfirm, setShowConfirm] = useState()
    const [inviteStatus, setInviteStatus] = useState('')

    const submitInvite = async () => {

        // setShow(false)
        const findRes = await fetch(`${apiBaseUrl}/users`, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": 'application/json',
            }
        })


        // // Probably should send back and display an error message if person is not found

        // // if (findRes.ok) maybe

        const parsedFindRes = await findRes.json();
        if (parsedFindRes.user) {
            const inviteId = parsedFindRes.user.id;
            // const userId = currentUserId;
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
                setValue({ name: '' })
            }
        } else {
            setInviteStatus('user not found')
        }




    }

    return (
        <>
            {currentProjectId && <div className='invite'>Invite Team Member<ShareOption
                className='invite-icon'
                onClick={() => setShow(true)}></ShareOption></div>}
            {show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setValue({ name: '' })
                        setInviteStatus('')
                    }}
                >
                    {!inviteStatus &&
                        <Form
                            value={value}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={submitInvite}
                        >
                            <FormField name="name" htmlfor="text-input-id" label="Who would you like to invite?">
                                <TextInput id="text-input-id" name="name" />
                            </FormField>
                            <Box direction="row" gap="medium">
                                <Button type="submit" color='lightblue' primary label="Submit" />
                            </Box>
                        </Form>}
                    {inviteStatus === 'user not found' &&
                        <Form
                            value={value}
                            onChange={nextValue => setValue(nextValue)}
                            onReset={() => setValue({})}
                            onSubmit={submitInvite}
                        >

                            <FormField name="name" htmlfor="text-input-id" label="Who would you like to invite?">
                                <TextInput id="text-input-id" name="name" />
                            </FormField>
                            <Box direction="row" gap="medium">
                                <Button type="submit" color='lightblue' primary label="Submit" />
                                <div style={{ display: 'flex', justifyContent: 'center', marginRight: '10px' }}>User not found!</div>
                            </Box>
                        </Form>}
                    {inviteStatus === 'sent' &&
                        <>
                            <div>Invite sent!</div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}><Checkmark /></div>
                        </>}
                    {inviteStatus === 'already invited' &&

                        <div>It looks like you've already invited {value.name} to this project.</div>
                    }
                </Layer>
            )}
        </>)


}

export default Invite;