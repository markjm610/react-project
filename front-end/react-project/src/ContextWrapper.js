import React, { useState } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper = () => {
    const [appState, setAppState] = useState({
        authToken: '',
        currentUserId: '',
        dragColumnId: null,
        columnPositions: [],
        1: [
            { taskId: 1, rowId: 0, heading: 'Task 1', description: 'This is task 1', columnId: 1 },
            { taskId: 2, rowId: 1, heading: 'Task 2', description: 'This is task 2', columnId: 1 },
            { taskId: 4, rowId: 2, heading: 'Task 4', description: 'This is task 4', columnId: 1 },
            { taskId: null, rowId: 3, columnId: 1 }],
        2: [{ taskId: 3, rowId: 0, heading: 'Task 3', description: 'This is task 3', columnId: 2 },
        { taskId: null, rowId: 1, columnId: 2 }]
    })


    return (
        <Context.Provider value={{ appState, setAppState }} >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;