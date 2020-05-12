import React, { useContext, useState } from 'react';
import Task from './Task';
import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';


const Column = ({ columnId }) => {

    const { appState, setAppState } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)




    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.COLUMN },
        begin: () => {
            console.log('drag column begin')
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        drop: () => console.log('drop column'),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })



    return (
        <>
            <div className='column-drop-zone' ref={drop}>
                <div className='column' ref={drag}>
                    <div className='add-column'><Add className='plus'></Add></div>
                    {appState[columnId].map((task, i) => <Task
                        key={i}
                        taskId={task.taskId}
                        taskDropZoneId={i}
                        heading={task.heading}
                        description={task.description}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                        columnId={task.columnId}
                    // dragColumnId={dragColumnId}
                    // setDragColumnId={setDragColumnId}
                    ></Task>)}

                </div>
            </div>
        </>
    )
}

export default Column;