import React, { useState, useContext, useEffect } from 'react';
import { Add } from 'grommet-icons';
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'

const WorkingArea = () => {

    const { displayedColumns } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)



    return (
        <>
            {displayedColumns.map(({ id, name, pagePosition, Tasks }, i) => {
                // Tasks.push({ id: null, heading: null, description: null, columnPosition: Tasks.length, columnId: id })

                return (<Column
                    key={i}
                    columnId={id}
                    name={name}
                    pagePosition={pagePosition}
                    tasksArray={Tasks}
                    currentlyDragging={currentlyDragging}
                    setCurrentlyDragging={setCurrentlyDragging}
                />)
            })}
            <AddColumn></AddColumn>
        </>
    )
}

export default WorkingArea;