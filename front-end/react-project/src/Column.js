import React from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';
// import Context from './Context';
// import { apiBaseUrl } from './config';

const Column = ({ tasksArray, name, pagePosition, columnId, currentlyDragging, setCurrentlyDragging }) => {



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
            <div className='column-drop-zone'>
                <div className='column'>
                    <div className='column__header'>
                        <AddTask
                            columnId={columnId}
                            taskArrLength={tasksArray.length}></AddTask>
                        <div className='column__name'>{name}</div>
                        <DeleteColumn columnId={columnId}></DeleteColumn>
                        {/* <div className='delete-column'><FormClose></FormClose></div> */}
                    </div>
                    <div className='tasks-container'>
                        {tasksArray.map((task, i) => <Task
                            key={task.id}
                            taskid={task.id}
                            taskdropzoneid={i}
                            heading={task.heading}
                            description={task.description}
                            currentlyDragging={currentlyDragging}
                            setCurrentlyDragging={setCurrentlyDragging}
                            columnId={task.columnId}
                            taskArrLength={tasksArray.length}
                        // dragColumnId={dragColumnId}
                        // setDragColumnId={setDragColumnId}
                        ></Task>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Column;