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

                return (<Column
                    key={id}
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