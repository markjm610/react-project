import React, { useState } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper = () => {

    const [authToken, setAuthToken] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    const [dragColumnId, setDragColumnId] = useState(null)
    const [displayedColumns, setDisplayedColumns] = useState([])
    const [projectMembers, setProjectMembers] = useState([])
    const [currentProjectId, setCurrentProjectId] = useState(null)
    const [taskArrays, setTaskArrays] = useState({})
    const [invites, setInvites] = useState([])
    const [projectArr, setProjectArr] = useState([])
    const [dragTaskId, setDragTaskId] = useState('')
    const [dragRef, setDragRef] = useState(true)
    const [draggingColumnId, setDraggingColumnId] = useState('')
    const [currentlyDraggingColumn, setCurrentlyDraggingColumn] = useState(null)
    const [currentlyDraggingProject, setCurrentlyDraggingProject] = useState(null)


    return (
        <Context.Provider value={
            {
                authToken, setAuthToken,
                currentUserId, setCurrentUserId,
                dragColumnId, setDragColumnId,
                displayedColumns, setDisplayedColumns,
                projectMembers, setProjectMembers,
                currentProjectId, setCurrentProjectId,
                taskArrays, setTaskArrays,
                invites, setInvites,
                projectArr, setProjectArr,
                dragTaskId, setDragTaskId,
                dragRef, setDragRef,
                draggingColumnId, setDraggingColumnId,
                currentlyDraggingColumn, setCurrentlyDraggingColumn,
                currentlyDraggingProject, setCurrentlyDraggingProject
            }
        } >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;