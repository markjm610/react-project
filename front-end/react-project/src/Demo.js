import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { FormNextLink, FormPreviousLink } from 'grommet-icons'
import { NavLink } from 'react-router-dom';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'



const Demo = ({ index }) => {
    const [value, setValue] = useState({ email: 'demo@user.com', password: 'password' });
    const { noForms, setAuthToken, setCurrentUserId, formPositions, updateFormPosition } = useContext(Context);



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

        <Draggable draggableId={'demo'}
            index={index}
            isDragDisabled={updateFormPosition[1] === 'demo'}
        >
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {updateFormPosition[1] === 'demo' && !noForms
                            ?
                            <div className='log-in-form' style={{ margin: 'auto', width: '400px' }}>
                                <h2>Demo</h2>
                                <Form
                                    value={value}
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

                                        <Button color='lightsteelblue' type="submit" primary label="Submit" />

                                    </Box>
                                </Form>
                            </div>
                            :
                            <>
                                {noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Demo</h2>
                                    </div>
                                </div>}
                                {updateFormPosition[0] === 'demo' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Demo</h2>
                                        <FormNextLink size='large' />
                                    </div>
                                </div>}
                                {updateFormPosition[2] === 'demo' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Demo</h2>
                                        <FormPreviousLink size='large' />
                                    </div>
                                </div>}
                            </>

                        }
                    </div>)
            }}
        </Draggable >


    );
}

export default Demo;