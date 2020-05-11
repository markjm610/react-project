import React from 'react';
import Column from './Column';


const columnArray = [0, 1]

const WorkingArea = () => {
    return (
        columnArray.map(column => <Column></Column>)

    )
}

export default WorkingArea;