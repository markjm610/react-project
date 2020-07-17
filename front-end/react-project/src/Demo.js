import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { FormNextLink, FormPreviousLink } from 'grommet-icons'
import { NavLink } from 'react-router-dom';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'



const Demo = ({ index }) => {
    const [emailValue, setEmailValue] = useState('demo@user.com');
    const [passwordValue, setPasswordValue] = useState('password')
    const { noForms, setAuthToken, setCurrentUserId, formPositions, updateFormPosition } = useContext(Context);
    const [clickedButton, setClickedButton] = useState(false)


    const handleSubmit = async () => {
        setClickedButton(true)
        try {
            const res = await fetch(`${apiBaseUrl}/users/token`, {
                method: 'PUT',
                body: JSON.stringify({ email: emailValue, password: passwordValue }),
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
                                <div className='form-container'>
                                    <form onSubmit={handleSubmit}>

                                        <label className='label'>Email:</label>
                                        <input
                                            disabled
                                            className='landing-page-input'
                                            value={emailValue}
                                        />
                                        <label className='label'>Password:</label>
                                        <input
                                            disabled
                                            type='password'
                                            className='landing-page-input'
                                            value={passwordValue}
                                        />
                                        <div onClick={handleSubmit} className={clickedButton ? 'form-button-clicked' : 'form-button'}>Submit</div>
                                    </form>
                                </div>
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
                                        <FormNextLink size='large' color='steelblue' />
                                    </div>
                                </div>}
                                {updateFormPosition[2] === 'demo' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Demo</h2>
                                        <FormPreviousLink size='large' color='steelblue' />
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