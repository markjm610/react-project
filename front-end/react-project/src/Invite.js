import React, { useState } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption } from 'grommet-icons';

const Invite = () => {

    const [show, setShow] = useState();
    const [value, setValue] = useState();

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
                    <FormField name="name" htmlfor="text-input-id" label="Name">
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