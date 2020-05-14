import React from 'react';
import Task from './Task';
import { AddCircle, FormClose } from 'grommet-icons';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
// import Context from './Context';
// import { apiBaseUrl } from './config';

const Column = ({ tasksArray, name, pagePosition, columnId, currentlyDragging, setCurrentlyDragging, columnTasks, setColumnTasks }) => {



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
                    <div className='column__header'>
                        <AddTask
                            columnId={columnId}
                            taskArrLength={tasksArray.length}></AddTask>
                        <div className='column__name'>{name}</div>
                        <div className='delete-column'><FormClose></FormClose></div>
                    </div>

                    {tasksArray.map((task, i) => <Task
                        key={i}
                        taskid={task.taskId}
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
        </>
    )
}

export default Column;