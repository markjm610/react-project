import { Layer } from 'grommet';
import React, { useState } from 'react'
import { apiBaseUrl } from './config';

const SwitchMode = () => {
    const [show, setShow] = useState(false)
    const [clickedButton, setClickedButton] = useState(false)

    const switchModeClick = async () => {
        setClickedButton(true)
        // setShow(false)
        const res = await fetch(`${apiBaseUrl}/projects/sync`)
        console.log(await res.json())
    }
    const showLayer = () => {
        setShow(true)
        setClickedButton(false)
    }

    return (
        <>
            <button onClick={showLayer}>Switch Mode</button>
            { show &&
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setClickedButton(false)
                        setShow(false)
                    }}>
                    <div className='popup-container'>
                        <div className='popup-text'>Switch modes?</div>
                        <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={switchModeClick}>Yes</div>
                    </div>
                </Layer>}
        </>
    )
}

export default SwitchMode