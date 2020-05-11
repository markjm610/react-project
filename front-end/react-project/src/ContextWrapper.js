import React, { useState, useEffect } from 'react';
import Context from './Context';
import App from './App';

const ContextWrapper = () => {
    const [appState, setAppState] = useState({ authToken: '', currentUserId: '' })


    return (
        <Context.Provider value={{ appState, setAppState }} >
            <App />
        </Context.Provider >
    )
}

export default ContextWrapper;