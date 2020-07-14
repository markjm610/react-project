import React, { useState, useContext } from 'react';
import { Add } from 'grommet-icons';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import Context from './Context';
import { apiBaseUrl } from './config';

const AddProject = () => {
    const { selectedProject, setSelectedProject, currentUserId, mainProjectArr, setMainProjectArr, listProjectArr, setListProjectArr } = useContext(Context)
    const [show, setShow] = useState();
    const [value, setValue] = useState({ name: '' });

    const addProjectClick = () => {
        setShow(true)
    }

    const addProjectSubmit = async () => {
        setShow(false);


        const projectsCopy = [...mainProjectArr]

        projectsCopy.push(...listProjectArr)


        const res = await fetch(`${apiBaseUrl}/users/${currentUserId}/projects`, {
            method: 'POST',
            body: JSON.stringify(
                { name: value.name, position: projectsCopy.length }
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

        value.name = ''
    }





    return (<>
        <div onClick={addProjectClick} className='add-project'>
            <Add className='add-project-icon'>
            </Add>
            <div className='add-profile-picture-text'>Add Project</div>
        </div>

        {
            show && (
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                        setValue({ name: '' })
                    }}
                >
                    <Form
                        value={value}
                        onChange={nextValue => setValue(nextValue)}
                        onReset={() => setValue({})}
                        onSubmit={addProjectSubmit}
                    >
                        <FormField name="name" htmlfor="text-input-id" label="Add Project:">
                            <TextInput id="text-input-id" name="name" />
                        </FormField>
                        <Box direction="row" gap="medium">
                            <Button type="submit" color='lightsteelblue' primary label="Submit" />
                        </Box>
                    </Form>
                </Layer>
            )
        }</>)
}

export default AddProject;