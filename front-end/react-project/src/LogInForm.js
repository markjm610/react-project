import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'


const LogInForm = ({ index }) => {
    const [value, setValue] = useState({ email: '', password: '' });
    const { setAuthToken, setCurrentUserId, updateFormPosition } = useContext(Context);



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

    // const onDragEnd = result => {
    //     const { destination, source, combine } = result

    //     // if (!destination) {
    //     //     return
    //     // }

    //     setValue({ email: 'demo@user.com', password: 'password' })



    // }

    return (

        // <Box className='log-in-sign-up-box'

        //     width='600px'
        //     height='600px'
        //     round='large'
        // >
        //     <div className='title-div'><div className='title'>Taskflow</div></div>
        <Draggable draggableId={'log-in'} index={index}>
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {updateFormPosition[1] === 'logIn' ? <div className='log-in-form' style={{ margin: 'auto', width: '400px' }}>
                            <h2>Log In</h2>
                            <Form
                                value={value}
                                onChange={nextValue => setValue(nextValue)}
                                // onReset={() => setValue({})}
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
                                    {/* 
                                    <Button color='lightblue' label="Demo" />
                                    <NavLink to='/signup'><Button color='lightblue' label="Sign up" /></NavLink> */}

                                </Box>
                            </Form>
                        </div> : <h2 className='form-name'>Log In</h2>}

                    </div>)
            }}
        </Draggable>
        // {/* </Box > */ }


    );
}

export default LogInForm;