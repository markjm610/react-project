import { Layer } from 'grommet';
import React, { useContext, useState } from 'react'
import { apiBaseUrl } from './config';
import Context from './Context';

const SwitchMode = () => {
    const { setDisplayedColumns, integrationMode, setIntegrationMode } = useContext(Context)
    const [show, setShow] = useState(false)
    const [clickedButton, setClickedButton] = useState(false)

    const switchModeClick = async () => {
        setClickedButton(true)
        if (!integrationMode) {
            const res = await fetch(`${apiBaseUrl}/projects/sync`)
            const { Columns } = await res.json()
            setDisplayedColumns(Columns)
        } else {
            // display top project on left
        }
        setIntegrationMode(!integrationMode)
        // setShow(false)

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
                    {!integrationMode &&
                        <div className='popup-container'>
                            <div className='popup-text'>Switch to integration mode?</div>
                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={switchModeClick}>Yes</div>
                        </div>}
                    {integrationMode &&
                        <div className='popup-container'>
                            <div className='popup-text'>Switch to normal mode?</div>
                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={switchModeClick}>Yes</div>
                        </div>}

                </Layer>}
        </>
    )
}

export default SwitchMode