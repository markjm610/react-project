import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'
import { FormNextLink, FormPreviousLink } from 'grommet-icons'

const LogInForm = ({ index }) => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('')
    const { noForms, setAuthToken, setCurrentUserId, updateFormPosition } = useContext(Context);

    const [clickedButton, setClickedButton] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
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

    // const onDragEnd = result => {
    //     const { destination, source, combine } = result

    //     // if (!destination) {
    //     //     return
    //     // }

    //     setValue({ email: 'demo@user.com', password: 'password' })



    // }

    return (

        <Draggable
            draggableId={'log-in'}
            index={index}
            isDragDisabled={updateFormPosition[1] === 'logIn'}
        >
            {(provided) => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {updateFormPosition[1] === 'logIn' && !noForms ? <div className='log-in-form' style={{ margin: 'auto', width: '400px' }}>
                            <h2>Log In</h2>
                            <div className='form-container'>
                                <form onSubmit={handleSubmit}>

                                    <label className='label'>Email:</label>
                                    <input
                                        className='landing-page-input'
                                        value={emailValue}
                                        onChange={e => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                            setEmailValue(e.target.value)
                                        }}
                                        onFocus={() => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                        }}
                                    />
                                    <label className='label'>Password:</label>
                                    <input
                                        type='password'
                                        className='landing-page-input'
                                        value={passwordValue}
                                        onChange={e => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                            setPasswordValue(e.target.value)
                                        }}
                                        onFocus={() => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                        }}
                                    />
                                    <div onClick={handleSubmit} className={clickedButton ? 'form-button-clicked' : 'form-button'}>Submit</div>
                                </form>
                            </div>
                        </div>
                            :
                            <>
                                {noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Log In</h2>
                                    </div>
                                </div>}
                                {updateFormPosition[0] === 'logIn' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Log In</h2>
                                        <FormNextLink size='large' color='steelblue' />
                                    </div>
                                </div>}
                                {updateFormPosition[2] === 'logIn' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Log In</h2>
                                        <FormPreviousLink size='large' color='steelblue' />
                                    </div>
                                </div>}
                            </>

                        }

                    </div>)
            }}
        </Draggable>



    );
}

export default LogInForm;