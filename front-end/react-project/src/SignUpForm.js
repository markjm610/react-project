import React, { useState, useContext } from 'react';
import { Form, Box, FormField, TextInput, Button } from 'grommet';
import { NavLink } from 'react-router-dom';
import { apiBaseUrl } from './config';
import Context from './Context';
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { FormNextLink, FormPreviousLink } from 'grommet-icons'

const SignUpForm = ({ index }) => {
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const {
        noForms,
        setAuthToken,
        setCurrentUserId,
        updateFormPosition,
        setMainProjectArr,
        setSelectedProject
    } = useContext(Context);

    const [clickedButton, setClickedButton] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setClickedButton(true)
        try {

            const res = await fetch(`${apiBaseUrl}/users`, {
                method: 'POST',
                body: JSON.stringify({ email: emailValue, name: nameValue, password: passwordValue }),
                headers: {
                    "Content-Type": 'application/json',
                }
            })

            if (!res.ok) {
                throw res;
            }
            const { token, user: { id, name }, newProject, newUsersProject } = await res.json();



            localStorage.setItem('TOKEN', token);
            localStorage.setItem('USER_ID', id);
            localStorage.setItem('USER_NAME', name);


            setAuthToken(token);
            setCurrentUserId(id);
            newProject.UsersProject = newUsersProject
            setMainProjectArr([newProject])
            setSelectedProject({ [newProject.id]: true })
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
                                    <label className='label'>Username:</label>
                                    <input
                                        className='landing-page-input'
                                        value={nameValue}
                                        onChange={e => {
                                            if (clickedButton) {
                                                setClickedButton(false)
                                            }
                                            setNameValue(e.target.value)
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

                        </div> :
                            <>
                                {noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Sign Up</h2>
                                    </div>
                                </div>}

                                {updateFormPosition[0] === 'signUp' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Sign Up</h2>
                                        <FormNextLink size='large' color='steelblue' />
                                    </div>
                                </div>}
                                {updateFormPosition[2] === 'signUp' && !noForms && <div className='form-name'>
                                    <div>
                                        <h2 className='no-form-name'>Sign Up</h2>
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

export default SignUpForm;