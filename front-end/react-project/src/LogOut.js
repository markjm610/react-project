import React from 'react';

const LogOut = () => {

    const logOutUser = () => {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER_ID');
    }

    return (
        <button onClick={logOutUser} className='log-out'>
            Log Out
        </button>
    )
}

export default LogOut;