import React from 'react';
import Task from './Task';
import { Add } from 'grommet-icons'

const Column = () => {

    return (
        <>
            <div className='column-drop-zone'>
                <div className='column'>
                    <div className='add-column'><Add className='plus'></Add></div>
                    <Task></Task>
                    <Task></Task>

                </div>
            </div>
        </>
    )
}

export default Column;