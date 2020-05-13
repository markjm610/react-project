import React, { useContext, useEffect } from 'react';
import Task from './Task';
import { AddCircle, FormClose } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';

const Column = ({ name, pagePosition, columnId, currentlyDragging, setCurrentlyDragging, columnTasks, setColumnTasks }) => {

    const { appState, setAppState } = useContext(Context);

    useEffect(() => {
        async function loadTasks() {
            console.log('load tasks')

            const tasksRes = await fetch(`${apiBaseUrl}/columns/${columnId}/tasks`);
            const parsedTasksRes = await tasksRes.json();

            setAppState({ ...appState, [columnId]: parsedTasksRes.tasks })
        }

        loadTasks()
    }, [])


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
                        <div className='add-column'><AddCircle></AddCircle></div>
                        <div className='column__name'>{name}</div>
                        <div className='delete-column'><FormClose></FormClose></div>
                    </div>{console.log(appState[columnId])}
                    {/* {appState[columnId].map((task, i) => <Task
                        key={i}
                        taskid={task.taskId}
                        taskdropzoneid={i}
                        heading={task.heading}
                        description={task.description}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                        columnId={task.columnId}
                        taskArrLength={appState[columnId].length}
                    // dragColumnId={dragColumnId}
                    // setDragColumnId={setDragColumnId}
                    ></Task>)} */}

                </div>
            </div>
        </>
    )
}

export default Column;