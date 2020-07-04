import React, { useState, useRef } from 'react';
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
    const [dragTaskId, setDragTaskId] = useState('')
    const [dragRef, setDragRef] = useState(true)
    const [draggingColumnId, setDraggingColumnId] = useState('')
    const [currentlyDraggingColumn, setCurrentlyDraggingColumn] = useState(null)
    const [currentlyDraggingProject, setCurrentlyDraggingProject] = useState(null)
    const [mainProjectArr, setMainProjectArr] = useState([])
    const [listProjectArr, setListProjectArr] = useState([])
    const [formPositions, setFormPositions] = useState(['demo', 'logIn', 'signUp'])
    const [updateFormPosition, setUpdateFormPosition] = useState(['demo', 'logIn', 'signUp'])
    const [currentSourceIndex, setCurrentSourceIndex] = useState(null)
    const [noForms, setNoForms] = useState(false)
    const [dragProjectId, setDragProjectId] = useState(null)
    const [linkDragging, setLinkDragging] = useState(false)
    const topOfList = useRef(null)
    const bottomOfMain = useRef(null)

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
                dragTaskId, setDragTaskId,
                dragRef, setDragRef,
                draggingColumnId, setDraggingColumnId,
                currentlyDraggingColumn, setCurrentlyDraggingColumn,
                currentlyDraggingProject, setCurrentlyDraggingProject,
                mainProjectArr, setMainProjectArr,
                listProjectArr, setListProjectArr,
                formPositions, setFormPositions,
                updateFormPosition, setUpdateFormPosition,
                currentSourceIndex, setCurrentSourceIndex,
                noForms, setNoForms,
                dragProjectId, setDragProjectId,
                linkDragging, setLinkDragging,
                topOfList,
                bottomOfMain
            }
        } >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;