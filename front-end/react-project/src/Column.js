import React, { useState, useContext } from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';
import Context from './Context';
import { apiBaseUrl } from './config';



// import Context from './Context';
// import { apiBaseUrl } from './config';

const Column = ({ columnDropZoneId, tasksArray, name, columnId, currentlyDragging, setCurrentlyDragging }) => {

    const {
        dragRef,
        setDragRef,
        // draggingColumnId,
        // setDraggingColumnId,
        currentlyDraggingColumn,
        setCurrentlyDraggingColumn,
        displayedColumns,
        setDisplayedColumns
    } = useContext(Context)

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.COLUMN, columnId },
        begin: () => {
            console.log('drag column begin')
            setCurrentlyDraggingColumn(columnDropZoneId)
        },
        end: (item) => {
            // console.log(item)
            // setDragTaskId('')
            handleDrop(item);
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })



    const changePositions = () => {


        // if (columnDropZoneId === columnArrLength - 1) {
        //     return;
        // }
        // const saveId = dragTaskId;
        const drag = currentlyDraggingColumn;

        // let startingColumn;

        let copy = [...displayedColumns];



        const moved = copy.splice(drag, 1);

        copy.splice(columnDropZoneId, 0, moved[0])

        copy.forEach((column, i) => {
            column.pagePosition = i;
        })



        // setDragColumnId(dragColumnId);

        setDisplayedColumns(copy);

        setCurrentlyDraggingColumn(columnDropZoneId);
        // setDragTaskId(saveId);

    }


    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        drop: () => {
            // handleDrop();
        },
        hover: (item) => {
            // console.log('hover')

            // if (taskid !== null && dragTaskId !== taskid) {
            //     setDragTaskId(taskid)
            // }

            if (currentlyDraggingColumn === columnDropZoneId) {
                return
            }

            // item.columnId = columnId;
            changePositions()

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    const handleDrop = async (item) => {
        // console.log('handle drop')
        let sendArr = [...displayedColumns];




        try {
            await fetch(`${apiBaseUrl}/columns`, {
                method: 'PUT',
                body: JSON.stringify({ sendArr }),
                headers: {
                    "Content-Type": 'application/json',
                }
            })

        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <div ref={drop} className='column-drop-zone'>
                {dragRef && <div ref={drag} className='column' style={
                    {
                        opacity: isDragging ? 0 : 1
                    }}>
                    <div className='column__header'>
                        <AddTask
                            columnId={columnId}
                            taskArrLength={tasksArray.length}></AddTask>
                        <div className='column__name'>{name}</div>
                        <DeleteColumn columnId={columnId}></DeleteColumn>
                    </div>
                    <div
                        onMouseDown={() => setDragRef(false)}
                        className='tasks-container'>
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

                </div>}
                {!dragRef && <div className='column'>
                    <div className='column__header'>
                        <AddTask
                            columnId={columnId}
                            taskArrLength={tasksArray.length}></AddTask>
                        <div className='column__name'>{name}</div>
                        <DeleteColumn columnId={columnId}></DeleteColumn>
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

                </div>}
            </div>
        </>
    )
}

export default Column;