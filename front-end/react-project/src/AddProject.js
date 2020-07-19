import React, { useState, useContext } from 'react';
import { Add } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

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

    const addProjectSubmit = async () => {
        setClickedButton(true)
        if (!value) {
            return;
        }
        setShow(false);


        const projectsCopy = [...mainProjectArr]

        projectsCopy.push(...listProjectArr)


        const res = await fetch(`${apiBaseUrl}/users/${currentUserId}/projects`, {
            method: 'POST',
            body: JSON.stringify(
                { name: value, position: projectsCopy.length }
            ),
            headers: {
                "Content-Type": 'application/json',
            }
        })

        const parsedRes = await res.json()
        const newProject = parsedRes.newProject
        const newUsersProject = parsedRes.newUsersProject
        newProject.UsersProject = newUsersProject
        projectsCopy.push(newProject)
        setMainProjectArr(projectsCopy.slice(0, 5))
        setListProjectArr(projectsCopy.slice(5))
        setSelectedProject({ ...selectedProject, [newProject.id]: false })

        setValue('')
    }





    return (<>
        <div onClick={addProjectClick} className='add-project'>
            <Add color='black' className='add-project-icon'>
            </Add>
            {/* <div className='add-profile-picture-text'>Add Project</div> */}
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
                    </div>
                </Layer>
            )
        }</>)
}

export default AddProject;