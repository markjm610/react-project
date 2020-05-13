import React, { useState } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption } from 'grommet-icons';
import { apiBaseUrl } from './config';

const Invite = () => {

    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });


    const submitInvite = async () => {
        const inviteRes = await fetch(`${apiBaseUrl}/users`, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": 'application/json',
            }
        })


        // Probably should send back and display an error message if person is not found

        // if (inviteRes.ok) maybe

        const parsedInviteRes = await inviteRes.json();
        const inviteId = parsedInviteRes.user.id;

        const sendInviteRes = await fetch(`${apiBaseUrl}/users/${inviteId}`, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        // Have to check for invites in database when the page loads

    }

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
                    onSubmit={({ value }) => { }}
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