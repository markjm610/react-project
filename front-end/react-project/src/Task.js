import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';
import DeleteTask from './DeleteTask';
import { Draggable } from 'react-beautiful-dnd'
import * as tweenFunctions from "tween-functions";
import { moveStepByStep, noScrollMoveToTop, scrollStepByStep } from './utils'

const Task = ({ columnHeader, taskRef, topTask, taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const {
        dragTaskId,
        setDragTaskId,
        dragColumnId,
        setDragColumnId,
        displayedColumns,
        setDisplayedColumns,
        sensorState,

    } = useContext(Context);


    const toTopClick = () => {
        const preDrag = sensorState.tryGetLock(`task-${taskid}`);

        // if (!preDrag) {
        //     return;
        // }
        const workingArea = document.querySelector('.working-area')
        // const beforeScrollTop = workingArea.scrollTop
        const leftSidebar = document.querySelector('.sidebar-left')
        const rightSidebar = document.querySelector('.sidebar-right')
        const leftSidebarEdge = leftSidebar.getBoundingClientRect().right
        const rightSidebarEdge = rightSidebar.getBoundingClientRect().left
        const percentage = 9 / (rightSidebarEdge - leftSidebarEdge)
        const widthOfWorkingArea = rightSidebarEdge - leftSidebarEdge
        const adjustment = percentage * widthOfWorkingArea

        const midpoint = (rightSidebarEdge - leftSidebarEdge) / 2
        const oneQuarter = midpoint / 2
        const twoThirds = (rightSidebarEdge - leftSidebarEdge) / 3 * 2
        const threeQuarters = midpoint / 2 + midpoint
        const currentScrollLeft = workingArea.scrollLeft

        const taskRefLeft = document.getElementById(`task-id-${taskid}`).getBoundingClientRect().left



        // workingArea.scrollTop = 0




        // Everything should be relative to screen size




        // This works but fix adjustment. Also don't know why right side needs adjustment
        // but left side doesn't
        if (taskRefLeft > twoThirds) {
            const amountToMove = taskRefLeft - twoThirds
            workingArea.scrollLeft = currentScrollLeft + amountToMove
        } else if (taskRefLeft < oneQuarter) {
            const amountToMove = oneQuarter - taskRefLeft
            workingArea.scrollLeft = currentScrollLeft - amountToMove
        }



        // Does not change based on scrolling
        // console.log(workingArea.getBoundingClientRect().left)


        // workingArea.addEventListener('scroll', noScrollMoveToTop);


        const endX = -(document.getElementById(`task-id-${taskid}`).getBoundingClientRect().x - topTask.current.getBoundingClientRect().x)

        const endY = -(document.getElementById(`task-id-${taskid}`).getBoundingClientRect().y - topTask.current.getBoundingClientRect().y) + workingArea.scrollTop

        const startSpot = { x: 0, y: 0 }
        const drag = preDrag.fluidLift(startSpot)

        const end = { x: endX, y: endY }

        const points = [];

        const numberOfPoints = 50;

        for (let i = 0; i < numberOfPoints; i++) {
            points.push({
                x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
            });
        }

        const scrollPoints = []
        for (let i = 0; i < numberOfPoints; i++) {
            scrollPoints.push(
                tweenFunctions.easeOutCirc(i, workingArea.scrollTop, 0, numberOfPoints)
            )
        }


        moveStepByStep(drag, points, scrollPoints)
    }


    if (taskdropzoneid === 0) {
        return (

            <Draggable draggableId={`task-${taskid}`} index={taskdropzoneid}>
                {(provided, snapshot) => {

                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <div className='task'
                                id={`task-id-${taskid}`}
                                ref={taskRef}>
                                <div className='task-drop-zone'
                                    ref={topTask}
                                    taskdropzoneid={taskdropzoneid}>
                                    <div
                                        className={snapshot.isDragging ? 'task__description-dragging' : 'task__description'}
                                    >{description}</div>
                                </div>
                            </div>
                        </div>)
                }
                }

            </Draggable >

        )
    } else {
        return (
            <Draggable draggableId={`task-${taskid}`} index={taskdropzoneid}>
                {(provided, snapshot) => {

                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <div className='task'
                                ref={taskRef}
                                id={`task-id-${taskid}`}
                                onClick={toTopClick}
                            >
                                <div className='task-drop-zone'
                                    taskdropzoneid={taskdropzoneid}>
                                    <div className={snapshot.isDragging ? 'task__description-dragging' : 'task__description'} >
                                        {description}

                                    </div>
                                </div>
                            </div>
                        </div>)
                }
                }

            </Draggable >
        )

    }

}


export default Task;


// style={{ backgroundColor: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow', color: (isDragging || (!isDragging && (dragTaskId === taskid))) && 'yellow' }}