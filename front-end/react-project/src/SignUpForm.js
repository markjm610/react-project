import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import { apiBaseUrl } from './config';
import Context from './Context';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { FormNextLink, FormPreviousLink } from 'grommet-icons'

const SignUpForm = ({ index }) => {
    const [value, setValue] = useState({ email: '', name: '', password: '' });
    const { noForms, setAuthToken, setCurrentUserId, updateFormPosition } = useContext(Context);
    const handleSubmit = async () => {

        try {

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
        <Draggable
            draggableId={'sign-up'}
            index={index}
            isDragDisabled={updateFormPosition[1] === 'signUp'}
        >
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {updateFormPosition[1] === 'signUp' && !noForms ? <div className='sign-up-form' style={{ margin: 'auto', width: '400px' }}>
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
                                <FormField name="name" htmlfor="text-input-id" label="Name:">
                                    <TextInput id="text-input-id" name="name" />
                                </FormField>
                                <FormField name="password" htmlfor="text-input-id" label="Password:">
                                    <TextInput type='password' id="text-input-id" name="password" />
                                </FormField>
                                <Box justify='between' direction="row" gap="medium">
                                    <Button color='lightsteelblue' type="submit" primary label="Submit" />

                                    {/* <NavLink to='/'><Button color='lightsteelblue' label="Log in" /></NavLink> */}
                                </Box>
                            </Form>
                        </div> :
                            <>
                                <>
                                    {updateFormPosition[0] === 'signUp' && <div className='form-name'>
                                        <div>
                                            <h2 className='no-form-name'>Sign Up</h2>
                                            <FormNextLink size='large' />
                                        </div>
                                    </div>}
                                    {updateFormPosition[2] === 'signUp' && <div className='form-name'>
                                        <div>
                                            <h2 className='no-form-name'>Sign Up</h2>
                                            <FormPreviousLink size='large' />
                                        </div>
                                    </div>}
                                </>
                            </>
                        }

                    </div>)
            }}
        </Draggable>



    );
}

export default SignUpForm;