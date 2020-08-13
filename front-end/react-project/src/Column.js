import React, { useContext, useRef, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Droppable, Draggable } from 'react-beautiful-dnd'
import * as tweenFunctions from "tween-functions";
import { moveStepByStepWithScroll } from './utils'
import { Trash } from 'grommet-icons';
import disableScroll from 'disable-scroll'



const Column = ({ columnArrayLength, columnDropZoneId, tasksArray, name, columnId, currentlyDragging, setCurrentlyDragging }) => {

    const {
        displayedColumns,
        setDisplayedColumns,
        sensorState,
        alphabetizing,
        setAlphabetizing,
        setCurrentSortedTaskArray,
        scriptSpeed
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
        if (alphabetizing) {
            return
        }
        if (tasksArray.length === 0) {
            return;
        }
        setCurrentSortedTaskArray(sortedTasks)
        setAlphabetizing(columnId)
        disableScroll.on()


        for (let i = 0; i < sortedTasks.length; i++) {
            const sortedTask = sortedTasks[i]
            if (sortedTask.description === tasksArray[i].description) {
                if (i === sortedTasks.length - 1) {
                    setAlphabetizing(false)
                    disableScroll.off()
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


                const spotMiddle = document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().top + document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().height / 2
                const taskMiddle = document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().top + document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().height / 2



                let startScrollTop = workingArea.scrollTop
                let nextScrollTop = workingArea.scrollTop


                if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {

                    startScrollTop = taskMiddle - third + workingArea.scrollTop
                    nextScrollTop = spotMiddle - third + workingArea.scrollTop
                }

                workingArea.scrollTop = startScrollTop


                const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                    - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                let endY;

                if (startScrollTop > workingArea.scrollTop) {


                    // startScrollTop = workingArea.scrollTop

                    if (nextScrollTop > workingArea.scrollTop) {

                        // nextScrollTop = workingArea.scrollTop
                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                    } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {

                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop
                    } else {


                        endY =
                            -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                                - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                            + workingArea.scrollTop - nextScrollTop

                    }

                } else if (nextScrollTop < workingArea.getBoundingClientRect().top) {

                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)
                        + workingArea.scrollTop
                } else {


                    endY = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().y
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().y)

                }


                const startSpot = { x: 0, y: 0 }
                const drag = preDrag.fluidLift(startSpot)

                const end = { x: endX, y: endY }

                const points = [];

                const numberOfPoints = scriptSpeed;

                for (let i = 0; i < numberOfPoints; i++) {
                    points.push({
                        x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                        y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
                    });
                }


                const scrollPoints = []
                for (let i = 0; i < numberOfPoints; i++) {
                    scrollPoints.push(
                        tweenFunctions.easeOutCirc(i, workingArea.scrollTop, nextScrollTop, numberOfPoints)
                    )
                }


                moveStepByStepWithScroll(drag, points, scrollPoints)
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
                        disableScroll.off()
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


                    let startScrollTop = workingArea.scrollTop
                    let nextScrollTop = workingArea.scrollTop


                    if (bottomOfTaskToMove + workingArea.scrollTop > workingArea.getBoundingClientRect().height) {
                        startScrollTop = taskMiddle - third + workingArea.scrollTop
                        nextScrollTop = spotMiddle - third + workingArea.scrollTop
                    }

                    workingArea.scrollTop = startScrollTop

                    const endX = -(document.getElementById(`task-id-${taskToMove.id}`).getBoundingClientRect().x
                        - document.getElementById(`task-id-${tasksArray[i].id}`).getBoundingClientRect().x)


                    let endY;

                    if (startScrollTop > workingArea.scrollTop) {
                        // startScrollTop = workingArea.scrollTop
                        if (nextScrollTop > workingArea.scrollTop) {

                            // nextScrollTop = workingArea.scrollTop
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
                            console.log(nextScrollTop)
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

                    const startSpot = { x: 0, y: 0 }
                    const drag = preDrag.fluidLift(startSpot)

                    const end = { x: endX, y: endY }

                    const points = [];

                    const numberOfPoints = scriptSpeed;

                    for (let i = 0; i < numberOfPoints; i++) {
                        points.push({
                            x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                            y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
                        });
                    }

                    const scrollPoints = []
                    for (let i = 0; i < numberOfPoints; i++) {
                        scrollPoints.push(
                            tweenFunctions.easeOutCirc(i, workingArea.scrollTop, nextScrollTop, numberOfPoints)
                        )
                    }

                    if (i === sortedTasks.length - 1) {
                        setAlphabetizing(false)
                        disableScroll.off()
                    }
                    moveStepByStepWithScroll(drag, points, scrollPoints)
                    break
                }
            }
        }
    }, [tasksArray])







    const clearCompleted = async () => {

        if (alphabetizing) {
            return
        }
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
        <Draggable
            draggableId={`column-${columnId}`}
            index={columnDropZoneId}
            isDragDisabled={!!alphabetizing}
        >
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
                                                        columnName={name}
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