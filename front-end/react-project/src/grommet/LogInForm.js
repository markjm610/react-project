import React, { useState } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm'

const LogInForm = () => {
    const [value, setValue] = useState({});
    return (
        <div style={{ margin: 'auto', width: '400px' }}>
            <h2>Log In</h2>
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                onSubmit={({ value }) => { }}
            >
                <FormField name="email" htmlfor="text-input-id" label="Email:">
                    <TextInput id="text-input-id" name="email" />
                </FormField>

                <FormField name="password" htmlfor="text-input-id" label="Password:">
                    <TextInput type='password' id="text-input-id" name="password" />
                </FormField>

                <Box justify='between' direction="row" gap="medium">

                    <Button color='lightblue' type="submit" primary label="Submit" />
                    {/* <Button color='lightblue' type="reset" label="Reset" /> */}
                    <NavLink to='/signup'><Button color='lightblue' label="Sign up" /></NavLink>

                </Box>
            </Form>
        </div>
    );
}

export default LogInForm;