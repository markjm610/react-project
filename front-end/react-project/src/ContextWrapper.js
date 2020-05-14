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



    return (
        <Context.Provider value={
            {
                authToken, setAuthToken,
                currentUserId, setCurrentUserId,
                dragColumnId, setDragColumnId,
                displayedColumns, setDisplayedColumns,
                projectMembers, setProjectMembers,
                currentProjectId, setCurrentProjectId,
                taskArrays, setTaskArrays
            }
        } >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;