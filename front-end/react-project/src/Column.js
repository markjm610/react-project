import React, { useState, useContext, useRef, useEffect } from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import * as tweenFunctions from "tween-functions";
import { moveStepByStep, noScroll } from './utils'
import { Trash } from 'grommet-icons';
import disableScroll from 'disable-scroll'
import AddColumn from './AddColumn';


const Column = ({ columnArrayLength, columnDropZoneId, tasksArray, name, columnId, currentlyDragging, setCurrentlyDragging }) => {

    const {
        currentlyDraggingColumn,
        setCurrentlyDraggingColumn,
        displayedColumns,
        setDisplayedColumns,
        sensorState,
        alphabetizing,
        setAlphabetizing,
        setCurrentSortedTaskArray,
        draggingTaskId,
        updateColumns,
        setTaskRefs,
        setDragStartFunction
    } = useContext(Context)

    const topTask = useRef(null)

    const columnHeader = useRef(null)


    const tasksArrayCopy = [...tasksArray]
    const sortedTasks = tasksArrayCopy.sort((a, b) => {
        if (a.description < b.description) {
            return -1
        } else if (a.description > b.description) {
            return 1
        } else {
            return 0
        }
    })

    const alphabetizeClick = () => {
        // Match each task with its final array position based on sortedTaskHeadings
        // Find ref of task currently at that position: taskRefs[finalposition]
        // Move task to that position

        if (tasksArray.length === 0) {
            return;
        }
        setCurrentSortedTaskArray(sortedTasks)
        setAlphabetizing(true)


        for (let i = 0; i < sortedTasks.length; i++) {
            const sortedTask = sortedTasks[i]
            if (sortedTask.description === tasksArray[i].description) {
                if (i === sortedTasks.length - 1) {
                    setAlphabetizing(false)
                }
                continue
            } else {
                let taskToMove;
                let taskIndexToMove;
                tasksArray.forEach((task, i) => {
                    if (task.description === sortedTask.description) {
                        taskToMove = task
                        taskIndexToMove = i
                    }
                })

                const preDrag = sensorState.tryGetLock(`task-${taskToMove.id}`);

                if (!preDrag) {
                    return;
                }



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
                const twoThirds = (rightSidebarEdge - leftSidebarEdge) / 3 * 2
                const currentScrollLeft = workingArea.scrollLeft

                const taskRefLeft = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().left

                if (taskRefLeft > twoThirds) {
                    const amountToMove = taskRefLeft - twoThirds
                    workingArea.scrollLeft = currentScrollLeft + twoThirds
                } else if (taskRefLeft < oneQuarter) {
                    const amountToMove = oneQuarter - taskRefLeft
                    workingArea.scrollLeft = currentScrollLeft - amountToMove
                }


                const bottomOfTaskToMove = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().bottom
                const topOfWorkingArea = workingArea.getBoundingClientRect().top
                const bottomOfWorkingArea = workingArea.getBoundingClientRect().bottom

                const bottomOfSpotToMoveTo = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().bottom
                const topOfSpotToMoveTo = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top

                const verticalMidpoint = (bottomOfWorkingArea - topOfWorkingArea) / 2
                const verticalThreeQuarters = verticalMidpoint / 2 + verticalMidpoint
                const third = (bottomOfWorkingArea - topOfWorkingArea) / 3
                const bottomOfTopTask = document.getElementById(`task-id-${tasksArray[0].id}`).getBoundingClientRect().bottom
                const topOfTopTask = document.getElementById(`task-id-${tasksArray[0].id}`).getBoundingClientRect().top
                // let scrollLock;
                // let scrollLock;
                // if (bottomOfSpotToMoveTo > third * 2) {
                //     scrollLock = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                //     workingArea.scrollTop = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                // }

                // console.log('bottomOfTaskToMove', bottomOfTaskToMove)
                // console.log('bottomOfWorkingArea', bottomOfWorkingArea)
                // console.log('workingArea.scrollHeight', workingArea.scrollHeight)
                let startScrollTop = workingArea.scrollTop
                let nextScrollTop = workingArea.scrollTop
                // if (bottomOfTaskToMove > third * 2 + workingArea.scrollTop) {
                // startScrollTop = bottomOfTaskToMove - (bottomOfWorkingArea - topOfWorkingArea) + verticalMidpoint
                // if (bottomOfTaskToMove > (bottomOfWorkingArea - topOfWorkingArea) + workingArea.scrollTop) {
                startScrollTop = bottomOfTaskToMove
                nextScrollTop = topOfSpotToMoveTo
                // }
                // document.getElementById(`task-id-${taskToMove.id}`).scrollIntoView()
                workingArea.scrollTop = startScrollTop

                // disableScroll.on()
                // workingArea.addEventListener('scroll', noScroll);

                const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                // workingArea.scrollTop becomes maxed out at a certain point and 
                // topOfTaskToMove keeps increasing
                let endY;
                if (topOfSpotToMoveTo < workingArea.scrollTop) {
                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                        + workingArea.scrollTop - topOfSpotToMoveTo
                } else {
                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                }


                // console.log('workingArea.scrollTop', workingArea.scrollTop)
                console.log('endY', endY)
                // console.log('scrollHeight', workingArea.scrollHeight)

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
                // console.log(points)

                const scrollPoints = []
                for (let i = 0; i < numberOfPoints; i++) {
                    scrollPoints.push(
                        tweenFunctions.easeOutCirc(i, startScrollTop, nextScrollTop, numberOfPoints)
                    )
                }
                // console.log(scrollPoints)

                moveStepByStep(drag, points, scrollPoints)
                break
            }
        }
    }


    useEffect(() => {
        if (alphabetizing) {
            for (let i = 0; i < sortedTasks.length; i++) {
                const sortedTask = sortedTasks[i]
                if (sortedTask.description === tasksArray[i].description) {
                    if (i === sortedTasks.length - 1) {
                        setAlphabetizing(false)
                        // disableScroll.off()
                    }
                    continue
                } else {
                    let taskToMove;
                    let taskIndexToMove;
                    tasksArray.forEach((task, i) => {
                        if (task.description === sortedTask.description) {
                            taskToMove = task
                            taskIndexToMove = i
                        }
                    })

                    const preDrag = sensorState.tryGetLock(`task-${taskToMove.id}`);

                    if (!preDrag) {
                        return;
                    }

                    const workingArea = document.querySelector('.working-area')

                    const topOfWorkingArea = workingArea.getBoundingClientRect().top
                    const bottomOfWorkingArea = workingArea.getBoundingClientRect().bottom
                    const topOfSpotToMoveTo = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top

                    const bottomOfSpotToMoveTo = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().bottom
                    const bottomOfTaskToMove = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().bottom
                    const third = (bottomOfWorkingArea - topOfWorkingArea) / 3
                    const verticalMidpoint = (bottomOfWorkingArea - topOfWorkingArea) / 2
                    const verticalThreeQuarters = verticalMidpoint / 2 + verticalMidpoint
                    const verticalOneQuarter = verticalMidpoint / 2

                    // Before moving, check to see if spot to move is low enough to cause scrolling down
                    // If spot to move is low enough to cause scrolling down, move scroll position so that spot
                    // is as high as possible without causing scrolling up
                    // Maybe can move up further and noScroll will actually work for Y direction
                    // let scrollLock;
                    // if (bottomOfSpotToMoveTo > third * 2) {
                    //     scrollLock = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                    //     workingArea.scrollTop = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                    // }


                    // workingArea.addEventListener('scroll', noScroll)
                    let startScrollTop = workingArea.scrollTop
                    let nextScrollTop = workingArea.scrollTop
                    // if (bottomOfTaskToMove > third * 2 + workingArea.scrollTop) {
                    // startScrollTop = bottomOfTaskToMove - (bottomOfWorkingArea - topOfWorkingArea) + verticalMidpoint
                    // if (bottomOfTaskToMove > (bottomOfWorkingArea - topOfWorkingArea) + workingArea.scrollTop) {
                    startScrollTop = bottomOfTaskToMove
                    nextScrollTop = topOfSpotToMoveTo
                    // }
                    // document.getElementById(`task-id-${taskToMove.id}`).scrollIntoView()
                    workingArea.scrollTop = startScrollTop

                    // disableScroll.on()
                    // workingArea.addEventListener('scroll', noScroll);

                    const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                    // workingArea.scrollTop becomes maxed out at a certain point and 
                    // topOfTaskToMove keeps increasing
                    let endY;
                    if (topOfSpotToMoveTo < workingArea.scrollTop) {
                        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                            - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop - topOfSpotToMoveTo
                    } else {
                        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                            - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                    }

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
                            tweenFunctions.easeOutCirc(i, startScrollTop, nextScrollTop, numberOfPoints)
                        )
                    }

                    if (i === sortedTasks.length - 1) {
                        setAlphabetizing(false)
                        // disableScroll.off()
                    }
                    moveStepByStep(drag, points, scrollPoints)
                    break
                }
            }
        }
    }, [tasksArray])







    const clearCompleted = async () => {


        await fetch(`${apiBaseUrl}/columns/${columnId}/tasks`, {
            method: 'DELETE'
        })
        let columnCopy = [...displayedColumns]

        columnCopy.forEach(column => {
            if (column.id === columnId) {
                column.Tasks = []
            }
        })
        setDisplayedColumns(columnCopy)



    }
    return (
        <Draggable draggableId={`column-${columnId}`} index={columnDropZoneId}>
            {(dragProvided, { isDragging }) => {
                return (
                    <div
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                    >
                        <div
                            className='column-drop-zone'>
                            <div className={isDragging ? 'column-dragging' : 'column'}>
                                <div
                                    ref={columnHeader}
                                    className='column__header' {...dragProvided.dragHandleProps}>
                                    {name !== 'Completed'
                                        ?
                                        <>
                                            <AddTask
                                                columnId={columnId}
                                                taskArrLength={tasksArray.length} />
                                            <div className='column__name'>{name}</div>
                                            <div className='alphabetize' onClick={alphabetizeClick}>ABC</div>
                                            <DeleteColumn columnId={columnId} />
                                        </>
                                        :
                                        <>
                                            <div><Trash color='black' className='trash-can' onClick={clearCompleted} /></div>
                                            <div className='completed-name'>{name}</div>

                                        </>}
                                </div>

                                <Droppable droppableId={`${columnId}`} type='task'>
                                    {(provided, snapshot) => {
                                        return (

                                            <div

                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className='tasks-container'>
                                                {tasksArray.map((task, i) => {
                                                    return (<Task
                                                        key={task.id}
                                                        taskid={task.id}
                                                        taskdropzoneid={i}
                                                        heading={task.heading}
                                                        description={task.description}
                                                        currentlyDragging={currentlyDragging}
                                                        setCurrentlyDragging={setCurrentlyDragging}
                                                        columnId={task.columnId}
                                                        taskArrLength={tasksArray.length}
                                                        topTask={topTask}
                                                        columnHeader={columnHeader}
                                                    />)

                                                })}
                                                {provided.placeholder}
                                            </div>)
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    </div>
                )
            }}

        </Draggable >
    )


}

export default Column;