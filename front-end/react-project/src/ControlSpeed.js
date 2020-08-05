import React, { useContext } from 'react'
import Context from './Context'

const ControlSpeed = () => {

    const { setScriptSpeed } = useContext(Context)

    const fast = () => {
        setScriptSpeed(10)
    }

    const medium = () => {
        setScriptSpeed(50)
    }

    const slow = () => {
        setScriptSpeed(100)
    }

    return (
        <div
            className='control-speed'

        >
            <div onClick={fast}>FAST</div>
            <div onClick={medium}>MEDIUM</div>
            <div onClick={slow}>SLOW</div>
        </div>
    )
}

export default ControlSpeed