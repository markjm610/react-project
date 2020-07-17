import React, { useState } from 'react';

const LogOut = () => {
    const [clickedButton, setClickedButton] = useState(false)

    const logOutUser = () => {
        setClickedButton(true)
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('USER_ID');
        window.location.href = '/';
    }

    return (
        <div onClick={logOutUser} className={clickedButton ? 'clicked-log-out' : 'log-out'}>
            Log Out
        </div>
    )
}

export default LogOut;