import React, { useState, useContext } from 'react';
import Column from './Column';
import Context from './Context';



const WorkingArea = () => {

    const { appState: { displayedColumns } } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)

    // let columnArray = [0];
    // if (projectId === 1) {
    //     columnArray = [{ columnId: 1 }, { columnId: 3 }]
    // } else if (projectId === 2) {
    //     columnArray = [0]
    // } else if (projectId === 3) {
    //     columnArray = [0, 1, 2]
    // }



    return displayedColumns.map(({ id, name, pagePosition }, i) => <Column
        key={i}
        columnId={id}
        name={name}
        pagePosition={pagePosition}
        currentlyDragging={currentlyDragging}
        setCurrentlyDragging={setCurrentlyDragging}
    ></Column>)

}

export default WorkingArea;