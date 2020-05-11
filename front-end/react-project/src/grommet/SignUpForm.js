import React, { useState } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import LogInForm from './LogInForm';
import { apiBaseUrl } from './config';
const SignUpForm = () => {
    const [value, setValue] = useState({});

    const handleSubmit = async () => {
        console.log(value);
        const res = await fetch(`${apiBaseUrl}/users`, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        if (!res.ok) {
            throw res;
        }
        const { token, user: { id } } = await res.json();

        localStorage.setItem('TOKEN', token);
        localStorage.setItem('USER_ID', id);
        // window.location.href = '/home';
    }
    return (
        <div style={{ margin: 'auto', width: '400px' }}>
            <h2>Sign Up</h2>
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                // onSubmit={({ value }) => { }}
                onSubmit={handleSubmit}
            >
                <FormField name="email" htmlfor="text-input-id" label="Email:">
                    <TextInput id="text-input-id" name="email" />
                </FormField>
                <FormField name="username" htmlfor="text-input-id" label="Username:">
                    <TextInput id="text-input-id" name="username" />
                </FormField>
                <FormField name="password" htmlfor="text-input-id" label="Password:">
                    <TextInput type='password' id="text-input-id" name="password" />
                </FormField>
                <Box justify='between' direction="row" gap="medium">
                    <Button color='lightblue' type="submit" primary label="Submit" />
                    {/* <Button color='lightblue' type="reset" label="Reset" /> */}
                    <NavLink to='/'><Button color='lightblue' label="Log in" /></NavLink>
                </Box>
            </Form>
        </div>
    );
}

export default SignUpForm;