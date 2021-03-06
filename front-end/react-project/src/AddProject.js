import React, { useState, useContext } from 'react';
import { Add } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';
import Tooltip from '@material-ui/core/Tooltip';


const AddProject = () => {
    const { selectedProject, setSelectedProject, currentUserId, mainProjectArr, setMainProjectArr, listProjectArr, setListProjectArr } = useContext(Context)
    const [show, setShow] = useState();
    const [value, setValue] = useState('');
    const [clickedButton, setClickedButton] = useState(false)

    const addProjectClick = () => {
        if (clickedButton) {
            setClickedButton(false)
        }
        setShow(true)
    }

    const addProjectSubmit = async (e) => {
        e.preventDefault()
        setClickedButton(true)
        if (!value) {
            return;
        }
        setShow(false);


        const mainProjectsCopy = [...mainProjectArr]
        const listProjectsCopy = [...listProjectArr]



        const res = await fetch(`${apiBaseUrl}/users/${currentUserId}/projects`, {
            method: 'POST',
            body: JSON.stringify(
                { name: value, position: mainProjectArr.length + listProjectArr.length }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json()
        const newProject = parsedRes.newProject
        const newUsersProject = parsedRes.newUsersProject
        newProject.UsersProject = newUsersProject
        if (mainProjectsCopy.length < 5 && listProjectsCopy.length) {
            listProjectsCopy.push(newProject)
        } else if (mainProjectsCopy.length < 5 && !listProjectsCopy.length) {
            mainProjectsCopy.push(newProject)
        } else if (mainProjectsCopy.length === 5) {
            listProjectsCopy.push(newProject)
        }

        setMainProjectArr(mainProjectsCopy)
        setListProjectArr(listProjectsCopy)
        setSelectedProject({ ...selectedProject, [newProject.id]: false })

        setValue('')
    }



    return (
        <>
            <div className='add-project'>
                <Tooltip title='Add Project' arrow placement='top'>
                    <div onClick={addProjectClick} className='add-project-icon-wrapper'>
                        <Add color='black' className='add-project-icon' />
                    </div>
                </Tooltip>
            </div>

            {
                show && (
                    <Layer
                        onEsc={() => setShow(false)}
                        onClickOutside={() => {
                            setClickedButton(false)
                            setShow(false)
                            setValue('')
                        }}
                    >
                        <div className='popup-container'>

                            <div className='popup-text'>Name your project:</div>
                            <form onSubmit={addProjectSubmit}>
                                <input
                                    className='popup-input'
                                    value={value}
                                    onChange={e => {
                                        if (clickedButton) {
                                            setClickedButton(false)
                                        }
                                        setValue(e.target.value)
                                    }}
                                    onFocus={() => {
                                        if (clickedButton) {
                                            setClickedButton(false)
                                        }
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={addProjectSubmit}>Add</div>
                                </div>
                            </form>
                        </div>
                    </Layer>
                )
            }
        </>)
}

export default AddProject;