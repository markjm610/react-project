import React, { useState, useContext } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption } from 'grommet-icons';
import { apiBaseUrl } from './config';
import Context from './Context';

const Invite = () => {
    const { currentUserId, currentProjectId } = useContext(Context);
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });
    const [showConfirm, setShowConfirm] = useState()

    // const submitInvite = async () => {
    //     const findRes = await fetch(`${apiBaseUrl}/users`, {
    //         method: 'PUT',
    //         body: JSON.stringify(value),
    //         headers: {
    //             "Content-Type": 'application/json',
    //         }
    //     })


    //     // // Probably should send back and display an error message if person is not found

    //     // // if (findRes.ok) maybe

    //     const parsedFindRes = await findRes.json();
    //     const inviteId = parsedFindRes.user.id;
    //     const userId = currentUserId;
    //     const projectId = currentProjectId;
    //     const sendInviteRes = await fetch(`${apiBaseUrl}/users/invites`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ inviteReceiver: inviteId, inviteSender: userId, projectId }),
    //         headers: {
    //             "Content-Type": 'application/json',
    //         }
    //     })

    //     if (sendInviteRes.ok) {
    //         console.log('invite sent')
    //     }

    //     // Have to check for invites in database when the page loads

    // }

    return (<>
        <div className='invite'><ShareOption
            className='invite-icon'
            onClick={() => setShow(true)}></ShareOption></div>
        {show && (
            <Layer
                onEsc={() => setShow(false)}
                onClickOutside={() => setShow(false)}
            >
                <Form
                    value={value}
                    onChange={nextValue => setValue(nextValue)}
                    onReset={() => setValue({})}
                // onSubmit={submitInvite}
                >
                    <FormField name="name" htmlfor="text-input-id" label="Who would you like to invite?">
                        <TextInput id="text-input-id" name="name" />
                    </FormField>
                    <Box direction="row" gap="medium">
                        <Button type="submit" primary label="Submit" />
                        <Button type="reset" label="Reset" />
                    </Box>
                </Form>
            </Layer>
        )}
    </>)


}

export default Invite;