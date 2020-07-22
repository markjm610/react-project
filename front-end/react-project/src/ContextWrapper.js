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
    const [sensorState, setSensorState] = useState(null)
    const topOfList = useRef(null)
    const bottomOfMain = useRef(null)
    const [alphabetizing, setAlphabetizing] = useState(false)
    const [currentSortedTaskArray, setCurrentSortedTaskArray] = useState([])
    const [currentSortingTask, setCurrentSortingTask] = useState(null)
    const [showProjectList, setShowProjectList] = useState(false)
    const [clearing, setClearing] = useState(false)
    const [selectedProject, setSelectedProject] = useState({})
    const [columnFull, setColumnFull] = useState(false)
    const [letterPositions, setLetterPositions] = useState(['L', 'W', 'S', 'A', 'T', 'K', 'O', 'F'])
    const [updateColumns, setUpdateColumns] = useState([])
    const [draggingTaskId, setDraggingTaskId] = useState(null)
    const [newUser, setNewUser] = useState(false)
    const [taskRefs, setTaskRefs] = useState(null)
    const [dragStartFunction, setDragStartFunction] = useState(null)
    const [columnDragging, setColumnDragging] = useState(false)

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
                sensorState, setSensorState,
                topOfList,
                bottomOfMain,
                alphabetizing, setAlphabetizing,
                currentSortedTaskArray, setCurrentSortedTaskArray,
                currentSortingTask, setCurrentSortingTask,
                showProjectList, setShowProjectList,
                clearing, setClearing,
                selectedProject, setSelectedProject,
                columnFull, setColumnFull,
                letterPositions, setLetterPositions,
                updateColumns, setUpdateColumns,
                draggingTaskId, setDraggingTaskId,
                newUser, setNewUser,
                taskRefs, setTaskRefs,
                dragStartFunction, setDragStartFunction,
                columnDragging, setColumnDragging
            }
        } >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;