import React, { useState, useContext } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption, Checkmark } from 'grommet-icons';
import { apiBaseUrl } from './config';
import Context from './Context';


const LeaveProject = () => {

    const [show, setShow] = useState(false)
    const {
        currentProjectId,
        currentUserId,
        mainProjectArr,
        listProjectArr,
        setMainProjectArr,
        setListProjectArr
    } = useContext(Context);

    const leaveProjectClick = async () => {
        await fetch(`${apiBaseUrl}/usersprojects/${currentUserId}/${currentProjectId}`, {
            method: 'DELETE'
        })
        // Reassign project positions

        const projectCopy = [...mainProjectArr, ...listProjectArr]
        const projectRemoved = projectCopy.filter((project, i) => {
            return project.id !== currentProjectId
        })
        projectRemoved.forEach((project, i) => {
            project.position = i
        })
        setMainProjectArr(projectRemoved.slice(0, 5))
        setListProjectArr(projectRemoved.slice(5))
        // Remove project from page
        // Show different project
        setShow(false)
    }

    return (
        <>
            {currentProjectId &&
                <>
                    <div className='leave-project' onClick={() => setShow(true)}>Leave Project</div >

                    {show && (
                        <Layer
                            onEsc={() => setShow(false)}
                            onClickOutside={() => {
                                setShow(false)
                            }}
                        >
                            <div>Are you sure you want to leave this project?</div>
                            <Button onClick={leaveProjectClick}>Yes</Button>
                        </Layer>)}
                </>
            }
        </>



    )
}

export default LeaveProject