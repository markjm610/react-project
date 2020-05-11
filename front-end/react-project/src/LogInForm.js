import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import Context from './Context';


const LogInForm = () => {
    const [value, setValue] = useState({});
    const { appState, setAppState } = useContext(Context);
    console.log(appState);
    // contextValue.setAppState({ 'test': 'test' })
    // console.log(contextValue.appState);
    const handleSubmit = async () => {

        try {
            const res = await fetch(`http://localhost:8000/users`, {
                method: 'PUT',
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
            setAppState({ authToken: token, currentUserId: id })
            console.log(appState)
        } catch (e) {
            console.error(e)
        }

        // window.location.href = '/home';
    }

    return (

        <div style={{ margin: 'auto', width: '400px' }}>
            <h2>Log In</h2>
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
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
                    {/* <Button color='lightblue' type="reset" label="Reset" /> */}
                    <NavLink to='/signup'><Button color='lightblue' label="Sign up" /></NavLink>

                </Box>
            </Form>
        </div>
    );
}

export default LogInForm;