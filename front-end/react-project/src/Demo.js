import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import Context from './Context';
import { apiBaseUrl } from './config';

const Demo = () => {
    const [value, setValue] = useState({ email: 'demo@user.com', password: 'password' });
    const { setAuthToken, setCurrentUserId } = useContext(Context);



    const handleSubmit = async () => {

        try {
            const res = await fetch(`${apiBaseUrl}/users/token`, {
                method: 'PUT',
                body: JSON.stringify(value),
                headers: {
                    "Content-Type": 'application/json',
                }
            })

            if (!res.ok) {
                throw res;
            }
            const { token, user: { id, name } } = await res.json();

            localStorage.setItem('TOKEN', token);
            localStorage.setItem('USER_ID', id);
            localStorage.setItem('USER_NAME', name);

            setAuthToken(token);
            setCurrentUserId(id);





        } catch (e) {
            console.error(e)
        }

    }
    return (

        <div className='log-in-form' style={{ margin: 'auto', width: '400px' }}>
            <h2>Demo</h2>
            <Form
                value={value}
                onSubmit={handleSubmit}
            >
                <FormField name="email" htmlfor="text-input-id" label="Email:">
                    <TextInput id="text-input-id" name="email" />
                </FormField>

                <FormField name="password" htmlfor="text-input-id" label="Password:">
                    <TextInput type='password' id="text-input-id" name="password" />
                </FormField>

                <Box justify='between' direction="row" gap="medium">

                    <Button color='lightblue' type="submit" primary label="Submit" />
                    <NavLink to='/'><Button color='lightblue' label="Log In" /></NavLink>
                    <NavLink to='/signup'><Button color='lightblue' label="Sign up" /></NavLink>

                </Box>
            </Form>
        </div>
    );
}

export default Demo;