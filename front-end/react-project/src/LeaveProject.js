import React, { useState, useContext } from 'react';
import { Layer, Form, Box, FormField, TextInput, Button } from 'grommet';
import { ShareOption, Checkmark, Close, Eject } from 'grommet-icons';
import { apiBaseUrl } from './config';
import Context from './Context';
import Tooltip from '@material-ui/core/Tooltip';


const LeaveProject = () => {
    const [clickedButton, setClickedButton] = useState(false)
    const [show, setShow] = useState(false)
    const {
        currentProjectId,
        setCurrentProjectId,
        currentUserId,
        mainProjectArr,
        listProjectArr,
        setMainProjectArr,
        setListProjectArr,
        setProjectMembers
    } = useContext(Context);

    const leaveProjectClick = async () => {
        setClickedButton(true)
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
        setCurrentProjectId(null)
        setProjectMembers([])
        setShow(false)
    }

    return (
        <>
            {currentProjectId &&
                <>
                    <Tooltip title='Leave Project' arrow>
                        <div className='leave-project'>
                            <Eject
                                color='black'
                                onClick={() => {
                                    if (clickedButton) {
                                        setClickedButton(false)
                                    }
                                    setShow(true)
                                }} />
                        </div>
                    </Tooltip>
                    {show && (
                        <Layer
                            onEsc={() => setShow(false)}
                            onClickOutside={() => {
                                setShow(false)
                                setClickedButton(false)
                            }}
                        >
                            <div className='popup-container'>
                                <div>Are you sure you want to leave this project?</div>
                                <div className='popup-button-container'>
                                    <div onClick={leaveProjectClick} className={clickedButton ? 'popup-button-clicked' : 'popup-button'}>Yes</div>
                                </div>
                            </div>
                        </Layer>)}
                </>
            }
        </>



    )
}

export default LeaveProject