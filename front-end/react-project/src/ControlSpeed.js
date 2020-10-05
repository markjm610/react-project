import React, { useContext, useState } from 'react'
import Context from './Context'
import { Play, FastForward, Rewind } from 'grommet-icons'
import Tooltip from '@material-ui/core/Tooltip';

const ControlSpeed = () => {

    const { setScriptSpeed } = useContext(Context)
    const [clicked, setClicked] = useState('medium')
    const fast = () => {
        setScriptSpeed(25)
        setClicked('fast')
    }

    const medium = () => {
        setScriptSpeed(75)
        setClicked('medium')
    }

    const slow = () => {
        setScriptSpeed(120)
        setClicked('slow')
    }

    return (
        <div
            className='control-speed'
        >
            <Tooltip arrow title='Slow'>
                <div onClick={slow} className={'speed-icon'} id='slow-button'>
                    <Rewind color={clicked === 'slow' && 'white'} />
                </div>
            </Tooltip>
            <Tooltip arrow title='Medium'>
                <div onClick={medium} className={'speed-icon'} id='medium-button'>
                    <Play color={clicked === 'medium' && 'white'} />
                </div>
            </Tooltip>
            <Tooltip arrow title='Fast'>
                <div onClick={fast} className={'speed-icon'} id='fast-button'>
                    <FastForward color={clicked === 'fast' && 'white'} />
                </div>
            </Tooltip>



        </div>
    )
}

export default ControlSpeed