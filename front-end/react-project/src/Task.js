import React, { useState, useContext, useRef, useCallback, useEffect } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';
import { apiBaseUrl } from './config';
import DeleteTask from './DeleteTask';
import { Draggable } from 'react-beautiful-dnd'
import * as tweenFunctions from "tween-functions";
import { moveStepByStep, noScroll } from './utils'

const Task = ({ columnHeader, taskRef, topTask, taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const {
        dragTaskId,
        setDragTaskId,
        dragColumnId,
        setDragColumnId,
        displayedColumns,
        setDisplayedColumns,
        sensorState
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
        const threeQuarters = midpoint / 2 + midpoint
        const currentScrollLeft = workingArea.scrollLeft

        const taskRefLeft = taskRef.current.getBoundingClientRect().left



        workingArea.scrollTop = 0


        // Everything should be relative to screen size


        // Doesn't cause scrolling
        // taskRefLeft 855
        // currentScrollLeft 339
        // threeQuarters 864
        // threeQuarters - taskRefLeft = 9, taskRefLeft is 9 left from threeQuarters

        // Does cause scrolling
        // taskRefLeft 857
        // currentScrollLeft 337
        // threeQuarters 864
        // threeQuarters - taskRefLeft = 7 taskRefLeft is 7 left from threeQuarters


        // Not sure if you can calculate the adjustment like this. The pixel count is based on my screen size.
        // It should be 7 / my rightSidebarEdge - leftSidebarEdge maybe

        // 


        // What is the formula? 
        // if threeQuarters - taskRefLeft < 7, 
        // move workArea.scrollLeft over to the right to make threeQuarters - taskRefLeft === 7
        // because that's the place the scroll container needs to be at for it to not cause scroll
        // So how much does the scroll container need to move?
        // How to find the difference between the current scroll position and the place it needs to go?
        // Change in scroll left?
        // With those numbers, scrollLeft had to increase by 2, so change in scrollLeft is 2

        // Can move to scroll position where threeQuarters - taskRefLeft === 7




        // This works but fix adjustment. Also don't know why right side needs adjustment
        // but left side doesn't
        if (taskRefLeft > adjustment + threeQuarters) {

            const amountToMove = taskRefLeft - (adjustment + threeQuarters)
            workingArea.scrollLeft = currentScrollLeft + amountToMove + 20
        } else if (taskRefLeft < oneQuarter) {
            const amountToMove = oneQuarter - taskRefLeft
            workingArea.scrollLeft = currentScrollLeft - amountToMove
        }



        // Does not change based on scrolling
        // console.log(workingArea.getBoundingClientRect().left)


        workingArea.addEventListener('scroll', noScroll);


        const endX = -(taskRef.current.getBoundingClientRect().x - topTask.current.getBoundingClientRect().x)

        const endY = -(taskRef.current.getBoundingClientRect().y - topTask.current.getBoundingClientRect().y)


        const startSpot = { x: 0, y: 0 }
        const drag = preDrag.fluidLift(startSpot)


        const end = { x: endX, y: endY }
        // drag.move(end)



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
                                taskid={taskid}
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
                                taskid={taskid}
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