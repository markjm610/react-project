import React, { useState, useContext, useRef } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { FormClose } from 'grommet-icons';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';
import DeleteTask from './DeleteTask';


const Task = ({ taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {
    // console.log(isOver)

    const { dragTaskId, setDragTaskId, dragColumnId, setDragColumnId, displayedColumns, setDisplayedColumns } = useContext(Context);


    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskid, taskdropzoneid, columnId },
        begin: () => {
            setCurrentlyDragging(taskdropzoneid);
            setDragColumnId(columnId);
            // setDragTaskId(taskid)
            // setAppState({ ...appState, dragColumnId: columnId })
        },
        end: () => {
            setDragTaskId('')
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
            console.log('in if')
            const saveId = dragTaskId;
            const drag = currentlyDragging;
            // setCurrentlyDragging(taskdropzoneid);
            let startingColumn;
            let copy = [...displayedColumns];

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
                    column.Tasks.forEach((task, i) => {
                        task.columnPosition = i;
                    })
                }
            })
            // console.log(taskdropzoneid)
            setDragColumnId(dragColumnId);
            setDisplayedColumns(copy);
            setCurrentlyDragging(taskdropzoneid);
            setDragTaskId(saveId);

        } else {

            const drag = currentlyDragging;
            const saveDragColumnId = dragColumnId;
            const saveId = dragTaskId;



            let startingColumn;
            let copy = [...displayedColumns];

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


            const moved = startingColumn.splice(drag, 1)


            newColumn.splice(taskdropzoneid, 0, moved[0])

            newColumn[taskdropzoneid].columnId = columnId;

            copy.forEach(column => {
                if (column.id === columnId) {
                    column.Tasks = newColumn;
                    column.Tasks.forEach((task, i) => {
                        task.columnPosition = i;
                    })

                } else if (column.id === saveDragColumnId) {
                    column.Tasks = startingColumn;
                    column.Tasks.forEach((task, i) => {
                        task.columnPosition = i;
                    })

                }
            })

            setDragColumnId(columnId);
            setDisplayedColumns(copy);
            setCurrentlyDragging(taskdropzoneid);

            setDragTaskId(saveId)
        }


    }

    const handleDrop = async () => {
        let sendArr = [];
        displayedColumns.forEach(column => {
            if (column.id === columnId) {
                sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
            } else if (column.id === dragColumnId) {
                sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
            }
        })

        await fetch(`${apiBaseUrl}/tasks`, {
            method: 'PATCH',
            body: JSON.stringify({ sendArr }),
            headers: {
                "Content-Type": 'application/json',
            }
        })
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            handleDrop();
            // setDragTaskId(null)
        },
        hover: (item) => {
            console.log(dragTaskId)
            console.log(taskid)

            if (taskid !== null) {
                setDragTaskId(taskid)
            }

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

    // drag(drop(ref))

    if (taskdropzoneid === taskArrLength - 1) {
        return (
            <>
                <div className='task-drop-zone'
                    ref={drop}
                    taskdropzoneid={taskdropzoneid}
                >

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
                        // opacity: (isDragging || dragTaskId === taskid && (isOver || !isOver)) ? 0.4 : 1,
                        opacity: (isDragging || (!isDragging && (dragTaskId === taskid))) ? 0.4 : 1,
                        // opacity: (isDragging || (!isDragging && ((dragTaskId === taskid) && (isOver || !isOver)))) ? 0.4 : 1,
                    }}>
                    <div
                        className='task__heading'
                        style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
                    >
                        <div className='task__heading-text'>{heading}</div>
                        <DeleteTask taskid={taskid} columnId={columnId}></DeleteTask>
                        {/* <div className='delete-task'><FormClose></FormClose></div> */}
                    </div>
                    <div
                        className='task__description'
                        style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
                    >{description}</div>
                </div>
            </div>


        )
    }

}


export default Task;