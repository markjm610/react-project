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
import { moveStepByStep } from './utils'

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
        setDisplayedColumns,
        sensorState
    } = useContext(Context)

    // const topTask = useRef(null)

    // const task0 = useRef(null)
    // const task1 = useRef(null)
    // const task2 = useRef(null)
    // const task3 = useRef(null)


    const taskRefs = {
        0: useRef(null),
        1: useRef(null),
        2: useRef(null),
        3: useRef(null),
        4: useRef(null),
        5: useRef(null),
        6: useRef(null),
        7: useRef(null),
        8: useRef(null)
    }

    // console.log(taskRefs)

    // const taskHeadings = tasksArray.map((task) => {
    //     return task.heading
    // })

    // const sortedTaskHeadings = taskHeadings.sort()
    // const sortedTaskHeadingsWithIds = sortedTaskHeadings.map(heading => {
    //     return { heading: task, }
    // })

    const tasksArrayCopy = [...tasksArray]
    const sortedTasks = tasksArrayCopy.sort((a, b) => {
        if (a.heading < b.heading) {
            return -1
        } else if (a.heading > b.heading) {
            return 1
        } else {
            return 0
        }
    })

    const alphabetizeClick = () => {
        // Match each task with its final array position based on sortedTaskHeadings
        // Find ref of task currently at that position: taskRefs[finalposition]
        // Move task to that position


        sortedTasks.forEach((sortedTask, i) => {
            if (i === 0) {

                let taskToMove;
                let taskIndexToMove;
                tasksArray.forEach((task, i) => {
                    if (task.heading === sortedTask.heading) {
                        taskToMove = task
                        taskIndexToMove = i
                    }
                })

                const preDrag = sensorState.tryGetLock(`task-${taskToMove.id}`);
                console.log(preDrag)
                if (!preDrag) {
                    return;
                }

                console.log(taskRefs[taskIndexToMove])
                console.log(taskRefs[i])
                const endX = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().x - taskRefs[i].current.getBoundingClientRect().x)
                console.log('endX', endX)
                const endY = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().y - taskRefs[i].current.getBoundingClientRect().y)
                console.log('endY', endY)
                // // const endX = target.current && target.current.getBoundingClientRect().x
                // // const endY = target.current && target.current.getBoundingClientRect().y


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



                moveStepByStep(drag, points)
            }

        })


    }








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
        <Draggable draggableId={`column-${columnId}`} index={columnDropZoneId}>
            {provided => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <Droppable droppableId={`${columnId}`} type='task'>
                            {(provided) => {
                                return (
                                    <div ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        <div
                                            // ref={drop} 
                                            className='column-drop-zone'>
                                            <div className='column'>
                                                <div className='column__header' onClick={alphabetizeClick}>
                                                    <AddTask
                                                        columnId={columnId}
                                                        taskArrLength={tasksArray.length}></AddTask>
                                                    <div className='column__name'>{name}</div>
                                                    <DeleteColumn columnId={columnId}></DeleteColumn>
                                                </div>
                                                <div className='tasks-container'>
                                                    {tasksArray.map((task, i) => {
                                                        // if (i === tasksArray.length - 1) {
                                                        //     return
                                                        // }

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
                                                            // topTask={topTask}
                                                            // taskRefArr={taskRefArr}
                                                            // setTaskRefArr={setTaskRefArr}
                                                            taskRef={taskRefs[i]}
                                                        />)

                                                    })}

                                                </div>

                                            </div>
                                        </div>
                                        {provided.placeholder}
                                    </div>)
                            }}
                        </Droppable>


                    </div>
                )
            }}

        </Draggable >
    )
}

export default Column;



// {/* {dragRef && <div className='column' style={
//                     {
//                         opacity: isDragging ? 0 : 1
//                     }}>
//                     <div className='column__header'>
//                         <AddTask
//                             columnId={columnId}
//                             taskArrLength={tasksArray.length}></AddTask>
//                         <div className='column__name'>{name}</div>
//                         <DeleteColumn columnId={columnId}></DeleteColumn>
//                     </div>
//                     <div
//                         onMouseDown={() => setDragRef(false)}
//                         className='tasks-container'>
//                         {tasksArray.map((task, i) => <Task
//                             key={task.id}
//                             taskid={task.id}
//                             taskdropzoneid={i}
//                             heading={task.heading}
//                             description={task.description}
//                             currentlyDragging={currentlyDragging}
//                             setCurrentlyDragging={setCurrentlyDragging}
//                             columnId={task.columnId}
//                             taskArrLength={tasksArray.length}
//                         // dragColumnId={dragColumnId}
//                         // setDragColumnId={setDragColumnId}
//                         ></Task>)}

//                     </div>

//                 </div>} */}