import React from 'react';
import Column from './Column';




const WorkingArea = ({ projectId }) => {

    let columnArray = [0];
    if (projectId === 1) {
        columnArray = [{ columnId: 1 }, { columnId: 2 }]
    } else if (projectId === 2) {
        columnArray = [0]
    } else if (projectId === 3) {
        columnArray = [0, 1, 2]
    }
    return columnArray.map(column => <Column columnId={column.columnId}></Column>)

}

export default WorkingArea;