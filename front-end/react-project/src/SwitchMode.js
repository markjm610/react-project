import { Layer } from 'grommet';
import React, { useState } from 'react'
import { apiBaseUrl } from './config';

const SwitchMode = () => {
    const [show, setShow] = useState(false)
    const click = async () => {
        await fetch(`${apiBaseUrl}/projects/sync`)
    }
    const showLayer = () => {
        setShow(true)
    }

    return (
        <>
            <button onClick={showLayer}>Switch Mode</button>
            { show &&
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setShow(false)
                    }}>
                    <div className='popup-container'></div>
                </Layer>}
        </>
    )
}

export default SwitchMode