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
                // console.log('topOfSpotToMoveTo', topOfSpotToMoveTo)
                // console.log('workingArea.getBoundingClientRect().height', workingArea.getBoundingClientRect().height)
                // console.log('workingArea.scrollTop', workingArea.scrollTop)
                // console.log('bottomOfTaskToMove', bottomOfTaskToMove)

                const spotMiddle = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top + document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().height / 2
                const taskMiddle = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().top + document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().height / 2
                // Before moving, check to see if spot to move is low enough to cause scrolling down
                // If spot to move is low enough to cause scrolling down, move scroll position so that spot
                // is as high as possible without causing scrolling up
                // Maybe can move up further and noScroll will actually work for Y direction
                // let scrollLock;
                // if (bottomOfSpotToMoveTo > third * 2) {
                //     scrollLock = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                //     workingArea.scrollTop = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                // }


                let startScrollTop = workingArea.scrollTop
                let nextScrollTop = workingArea.scrollTop

                // This part needs to be changed... maybe?
                if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {
                    console.log('bottomOfTaskToMove > workingArea.getBoundingClientRect().height')
                    startScrollTop = taskMiddle - third + workingArea.scrollTop
                    nextScrollTop = spotMiddle - third + workingArea.scrollTop
                }
                console.log('bottomOfTaskToMove', bottomOfTaskToMove)
                console.log('workingArea.getBoundingClientRect().height', workingArea.getBoundingClientRect().height)

                // startScrollTop might be too high and workingArea.scrollTop will hit max, making them
                // not actually equal after this point
                workingArea.scrollTop = startScrollTop
                console.log('workingArea.scrollTop', workingArea.scrollTop)
                // disableScroll.on()
                // workingArea.addEventListener('scroll', noScroll);

                const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                let endY;
                // if (topOfSpotToMoveTo < workingArea.scrollTop) {

                // If else causes the framing to be lower every time until the spot to move to is no longer
                // on the screen
                if (startScrollTop > workingArea.scrollTop) {
                    console.log('if')

                    startScrollTop = workingArea.scrollTop
                    console.log('startScrollTop', startScrollTop)
                    if (nextScrollTop > workingArea.scrollTop) {
                        console.log('if if')
                        nextScrollTop = workingArea.scrollTop
                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                    } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
                        console.log('if else if')
                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop
                    } else {
                        console.log('if else')

                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop - nextScrollTop

                    }

                } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
                    console.log('else if')

                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                        + workingArea.scrollTop
                } else {
                    console.log('else')

                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)

                }

                // Apparently the if statement does not mean it's scrolled all the way down?
                // Because how else would startScrollTop be changing?
                // How are startScrollTop and nextScrollTop oscillating? I thought startScrollTop would be
                // the same as long as it's making it past the if statement and nextScrollTop would only
                // increase as it moves down the list

                //  if
                //  if else
                //  startScrollTop 600
                //  nextScrollTop 360.5

                //  if
                //  if else
                //  startScrollTop 454
                //  nextScrollTop 334.5

                //  if
                //  if else
                //  startScrollTop 480
                //  nextScrollTop 420.5

                //  if
                //  if else
                //  startScrollTop 574
                //  nextScrollTop 394.5

                //  if
                //  if else
                //  startScrollTop 660
                //  nextScrollTop 480.5

                //  if
                //  if else
                //  startScrollTop 694
                //  nextScrollTop 454.5

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
                    const topOfTopTask = document.getElementById(`task-id-${tasksArray[0].id}`).getBoundingClientRect().top
                    const bottomOfSpotToMoveTo = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().bottom
                    const bottomOfTaskToMove = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().bottom
                    const third = (bottomOfWorkingArea - topOfWorkingArea) / 3
                    const verticalMidpoint = (bottomOfWorkingArea - topOfWorkingArea) / 2
                    const verticalThreeQuarters = verticalMidpoint / 2 + verticalMidpoint
                    const verticalOneQuarter = verticalMidpoint / 2

                    const spotMiddle = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top + document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().height / 2
                    const taskMiddle = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().top + document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().height / 2
                    // Before moving, check to see if spot to move is low enough to cause scrolling down
                    // If spot to move is low enough to cause scrolling down, move scroll position so that spot
                    // is as high as possible without causing scrolling up
                    // Maybe can move up further and noScroll will actually work for Y direction
                    // let scrollLock;
                    // if (bottomOfSpotToMoveTo > third * 2) {
                    //     scrollLock = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                    //     workingArea.scrollTop = workingArea.scrollTop + (bottomOfSpotToMoveTo - third)
                    // }
                    console.log(taskToMove.description)

                    let startScrollTop = workingArea.scrollTop
                    let nextScrollTop = workingArea.scrollTop

                    // This part needs to be changed... maybe?
                    if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {
                        console.log('bottomOfTaskToMove > workingArea.getBoundingClientRect().height')
                        startScrollTop = taskMiddle - third + workingArea.scrollTop
                        nextScrollTop = spotMiddle - third + workingArea.scrollTop
                    }
                    console.log('bottomOfTaskToMove', bottomOfTaskToMove)
                    console.log('workingArea.getBoundingClientRect().height', workingArea.getBoundingClientRect().height)
                    // startScrollTop might be too high and workingArea.scrollTop will hit max, making them
                    // not actually equal after this point
                    workingArea.scrollTop = startScrollTop

                    // disableScroll.on()
                    // workingArea.addEventListener('scroll', noScroll);

                    const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                    let endY;
                    // if (topOfSpotToMoveTo < workingArea.scrollTop) {

                    if (startScrollTop > workingArea.scrollTop) {
                        console.log('if')
                        console.log('workingArea.scrollTop', workingArea.scrollTop)
                        startScrollTop = workingArea.scrollTop
                        if (nextScrollTop > workingArea.scrollTop) {
                            console.log('if nextScrollTop > workingArea.scrollTop')
                            nextScrollTop = workingArea.scrollTop
                            endY =
                                -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                        } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
                            endY =
                                -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                                + workingArea.scrollTop
                        } else {
                            console.log('if else')

                            endY =
                                -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                                + workingArea.scrollTop - nextScrollTop

                        }
                        // nextScrollTop = workingArea.scrollTop - nextScrollTop


                        // - nextScrollTop - workingArea.scrollTop
                        // + nextScrollTop - workingArea.scrollTop
                    } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {
                        console.log('else if')

                        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                            - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop
                    } else {
                        console.log('else')

                        endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                            - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)

                    }
                    console.log('startScrollTop', startScrollTop)
                    console.log('nextScrollTop', nextScrollTop)
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