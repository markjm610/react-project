import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';
import DeleteTask from './DeleteTask';
import { Draggable } from 'react-beautiful-dnd'
import * as tweenFunctions from "tween-functions";
import { moveStepByStep } from './utils'


const Task = ({ taskRef, topTask, taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const {
        dragTaskId,
        setDragTaskId,
        dragColumnId,
        setDragColumnId,
        displayedColumns,
        setDisplayedColumns,
        sensorState
    } = useContext(Context);

    const currentTaskRef = useRef(null)


    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskid, taskdropzoneid, columnId },
        begin: () => {
            setCurrentlyDragging(taskdropzoneid);
            setDragColumnId(columnId);
            // setDragTaskId(taskid)
        },
        end: (item) => {
            // console.log(item)
            setDragTaskId('')
            handleDrop(item);
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    const changePositions = () => {

        if (dragColumnId === columnId) {
            if (taskdropzoneid === taskArrLength - 1) {
                return;
            }

            const saveId = dragTaskId;
            const drag = currentlyDragging;

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
                        // console.log(task.columnPosition)
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

    const handleDrop = async (item) => {
        // console.log('handle drop')
        let sendArr = [];

        let copy = [...displayedColumns];

        copy.forEach(column => {
            if (column.id === columnId) {
                // console.log('column.id === columnId')
                sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
            } else if (column.id === item.columnId) {
                // console.log('column.id === item.columnId')
                sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
            }
        })

        // console.log(sendArr);

        try {
            await fetch(`${apiBaseUrl}/tasks`, {
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

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            // handleDrop();
        },
        hover: (item) => {


            if (taskid !== null && dragTaskId !== taskid) {
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



    const toTopClick = () => {
        const preDrag = sensorState.tryGetLock(`task-${taskid}`);

        // if (!preDrag) {
        //     return;
        // }

        const endX = -(currentTaskRef.current.getBoundingClientRect().x - topTask.current.getBoundingClientRect().x)

        const endY = -(currentTaskRef.current.getBoundingClientRect().y - topTask.current.getBoundingClientRect().y)

        // const endX = target.current && target.current.getBoundingClientRect().x
        // const endY = target.current && target.current.getBoundingClientRect().y


        const startSpot = { x: 0, y: 0 }
        const drag = preDrag.fluidLift(startSpot)

        const end = { x: endX, y: endY }
        // drag.move(end)
        // drag.drop()

        const points = [];

        const numberOfPoints = 50;

        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
            });
        }



        moveStepByStep(drag, points)
    }


    // if (taskdropzoneid === 0) {
    //     return (

    //         <Draggable draggableId={`task-${taskid}`} index={taskdropzoneid}>
    //             {(provided) => {

    //                 return (
    //                     <div
    //                         {...provided.draggableProps}
    //                         {...provided.dragHandleProps}
    //                         ref={provided.innerRef}>
    //                         <div className='task'
    //                             ref={topTask}
    //                             taskid={taskid}

    //                             style={{
    //                                 // opacity: (isDragging || (!isDragging && (dragTaskId === taskid))) ? 0.4 : 1,
    //                             }}>
    //                             <div className='task-drop-zone'
    //                                 // ref={drop}
    //                                 taskdropzoneid={taskdropzoneid}>
    //                                 <div
    //                                     className='task__heading'
    //                                 // style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
    //                                 >
    //                                     <div className='task__heading-text'>{heading}</div>
    //                                     <DeleteTask taskid={taskid} columnId={columnId}></DeleteTask>
    //                                 </div></div>

    //                             <div
    //                                 className='task__description'
    //                             // style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
    //                             >{description}</div>
    //                         </div>
    //                     </div>)
    //             }
    //             }

    //         </Draggable >

    //     )
    // } else {
    return (

        <Draggable draggableId={`task-${taskid}`} index={taskdropzoneid}>
            {(provided) => {

                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <div className='task'
                            // ref={currentTaskRef}
                            ref={taskRef}
                            // ref={taskRefArr[taskdropzoneid]}
                            taskid={taskid}
                            onClick={toTopClick}
                            style={{
                                // opacity: (isDragging || (!isDragging && (dragTaskId === taskid))) ? 0.4 : 1,
                            }}>
                            <div className='task-drop-zone'
                                // ref={drop}
                                taskdropzoneid={taskdropzoneid}>
                                <div
                                    className='task__heading'
                                // style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
                                >
                                    <div className='task__heading-text'>{heading}</div>
                                    <DeleteTask taskid={taskid} columnId={columnId}></DeleteTask>
                                </div></div>

                            <div
                                className='task__description'
                            // style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}
                            >{description}</div>
                        </div>
                    </div>)
            }
            }

        </Draggable >

    )
    // }

    // }

}


export default Task;