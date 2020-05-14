import React, { useState, useContext, useRef, useCallback } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';


const Task = ({ taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const { dragColumnId, setDragColumnId, displayedColumns, setDisplayedColumns } = useContext(Context);


    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskid, taskdropzoneid, columnId },
        begin: () => {
            setCurrentlyDragging(taskdropzoneid);
            setDragColumnId(columnId);
            // setAppState({ ...appState, dragColumnId: columnId })
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const changePositions = () => {

        if (dragColumnId === columnId) {
            if (taskdropzoneid === taskArrLength - 1) {
                return;
            }
            // console.log('in if')
            const drag = currentlyDragging;
            setCurrentlyDragging(taskdropzoneid);
            let startingColumn;
            let copy = displayedColumns;

            copy.forEach(column => {
                if (column.id === columnId) {
                    startingColumn = column.Tasks.slice();
                }
            })

            const moved = startingColumn.splice(drag, 1);
            startingColumn.splice(taskdropzoneid, 0, moved[0])
            copy.forEach(column => {
                if (column.id === columnId) {
                    column.Tasks = startingColumn;
                }
            })
            setDragColumnId(dragColumnId);
            setDisplayedColumns(copy)
            // console.log(displayedColumns)
            // setAppState({ ...appState, [columnId]: startingColumn })

        } else {
            // console.log('in else');

            const drag = currentlyDragging;
            const saveDragColumnId = dragColumnId;


            setCurrentlyDragging(taskdropzoneid)
            // const startingColumn = appState[saveDragColumnId].slice();

            let startingColumn;
            let copy = displayedColumns;

            copy.forEach(column => {
                if (column.id === saveDragColumnId) {
                    startingColumn = column.Tasks.slice();
                }
            })

            let newColumn;

            copy.forEach(column => {
                if (column.id === columnId) {
                    newColumn = column.Tasks.slice();
                }
            })


            // const newColumn = appState[columnId].slice();

            const moved = startingColumn.splice(drag, 1)


            newColumn.splice(taskdropzoneid, 0, moved[0])
            // console.log(taskdropzoneid)
            newColumn[taskdropzoneid].columnId = columnId;


            copy.forEach(column => {
                if (column.id === columnId) {
                    column.Tasks = newColumn;
                    column.Tasks.forEach((task, i) => {
                        task.columnPosition = i;
                    })
                    // console.log(column.Tasks)
                } else if (column.id === saveDragColumnId) {
                    column.Tasks = startingColumn;
                    column.Tasks.forEach((task, i) => {
                        task.columnPosition = i;
                    })
                    // console.log(column.Tasks)
                }
            })


            setDisplayedColumns(copy);
        }


    }

    const handleDrop = async () => {
        // await fetch(`${apiBaseUrl}/tasks`, {
        //     method: 'PATCH',
        //     body: JSON.stringify({ columnId, dragColumnId }),
        //     headers: {
        //         "Content-Type": 'application/json',
        //     }
        // })



    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            handleDrop();
        },
        hover: (item) => {
            // console.log('currentlyDragging=', currentlyDragging);
            // console.log('taskdropzoneid=', taskdropzoneid);
            // console.log('item.columnId=', item.columnId)
            // console.log('columnId=', columnId)
            if (currentlyDragging === taskdropzoneid && item.columnId === columnId) {
                return
            }
            item.columnId = columnId;
            changePositions()

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    // drop(ref)
    if (taskdropzoneid === taskArrLength - 1) {
        return (
            <>
                <div className='task-drop-zone'
                    ref={drop}
                    taskdropzoneid={taskdropzoneid}>

                </div>

            </>
        )
    } else {
        return (

            <div className='task-drop-zone'
                ref={drop}
                taskdropzoneid={taskdropzoneid}>
                <div className='task'
                    ref={drag}
                    taskid={taskid} style={{
                        opacity: isOver ? 0 : 1
                    }}>
                    <div className='task__heading'>{heading}</div>
                    <div className='task__description'>{description}</div>
                </div>
            </div>

        )
    }

}

export default Task;