import React, { useState, useContext } from 'react'
import { CircleInformation } from 'grommet-icons'
import { Layer } from 'grommet'
import { Tooltip } from '@material-ui/core'
import { apiBaseUrl } from './config';
import Context from './Context';

const AddInstructionalProject = () => {

    const {
        mainProjectArr,
        setMainProjectArr,
        listProjectArr,
        setListProjectArr,
        selectedProject,
        setSelectedProject,
        currentUserId,
        alphabetizing
    } = useContext(Context)

    const [show, setShow] = useState(false)
    const [clickedButton, setClickedButton] = useState(false)

    const addInstructionalProject = async () => {

        const res = await fetch(`${apiBaseUrl}/users/${currentUserId}/projects/instructions`)

        const parsedRes = await res.json()

        const mainProjectsCopy = [...mainProjectArr]
        const listProjectsCopy = [...listProjectArr]


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
        setShow(false)
    }

    const clickIcon = () => {
        if (alphabetizing) {
            return
        }
        setShow(true)
    }

    return (
        <>
            <Tooltip arrow title='Instructions'>
                <div className='add-instructional-project'>
                    <CircleInformation className='circle-information' onClick={clickIcon} />
                </div>
            </Tooltip>
            {show &&
                <Layer onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setClickedButton(false)
                        setShow(false)
                    }}>
                    <div className='popup-container'>
                        <div>Do you want to add an instructional project? You can navigate to it like any other project.</div>
                        <div className='popup-button-container'>
                            <div onClick={addInstructionalProject} className={clickedButton ? 'popup-button-clicked' : 'popup-button'}>Yes</div>
                        </div>
                    </div>
                </Layer>
            }
        </>
    )

}

export default AddInstructionalProject