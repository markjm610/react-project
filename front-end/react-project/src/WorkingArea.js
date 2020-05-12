import React, { useState } from 'react';
import Column from './Column';




const WorkingArea = ({ projectId }) => {

    const [currentlyDragging, setCurrentlyDragging] = useState(null)

    let columnArray = [0];
    if (projectId === 1) {
        columnArray = [{ columnId: 1 }, { columnId: 2 }]
    } else if (projectId === 2) {
        columnArray = [0]
    } else if (projectId === 3) {
        columnArray = [0, 1, 2]
    }
    return columnArray.map((column, i) => <Column
        key={i}
        columnId={column.columnId}
        currentlyDragging={currentlyDragging}
        setCurrentlyDragging={setCurrentlyDragging}></Column>)

}

export default WorkingArea;