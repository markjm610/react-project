import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'
import { apiBaseUrl } from './config';

const WorkingArea = () => {

    const { displayedColumns } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)


    return (
        <>
            {
                displayedColumns.map(({ id, name, pagePosition, Tasks }, i) => {
                    return (<Column
                        key={id}
                        columnDropZoneId={i}
                        columnId={id}
                        name={name}
                        pagePosition={pagePosition}
                        tasksArray={Tasks}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                    />)
                })
            }
            {/* <AddColumn /> */}
        </>

    )
}

export default WorkingArea;