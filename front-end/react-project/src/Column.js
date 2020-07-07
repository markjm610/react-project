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
import { Trash } from 'grommet-icons';

// import Context from './Context';
// import { apiBaseUrl } from './config';

const Column = ({ columnDropZoneId, tasksArray, name, columnId, currentlyDragging, setCurrentlyDragging }) => {

    const {
        currentlyDraggingColumn,
        setCurrentlyDraggingColumn,
        displayedColumns,
        setDisplayedColumns,
        sensorState,
        alphabetizing,
        setAlphabetizing,
        setCurrentSortedTaskArray,
        clearing,
        setClearing
    } = useContext(Context)

    const topTask = useRef(null)

    const taskRefs = {
        0: useRef(null),
        1: useRef(null),
        2: useRef(null),
        3: useRef(null),
        4: useRef(null),
        5: useRef(null),
        6: useRef(null),
        7: useRef(null),
        8: useRef(null),
        9: useRef(null)
    }

    const trashCan = useRef(null)
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
        setCurrentSortedTaskArray(sortedTasks)
        setAlphabetizing(true)


        for (let i = 0; i < sortedTasks.length; i++) {
            const sortedTask = sortedTasks[i]
            if (sortedTask.description === tasksArray[i].description) {
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


                const endX = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().x - taskRefs[i].current.getBoundingClientRect().x)

                const endY = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().y - taskRefs[i].current.getBoundingClientRect().y)

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


                    const endX = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().x - taskRefs[i].current.getBoundingClientRect().x)

                    const endY = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().y - taskRefs[i].current.getBoundingClientRect().y)

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


                    if (i === sortedTasks.length - 1) {
                        setAlphabetizing(false)
                    }
                    moveStepByStep(drag, points)
                    break
                }
            }
        }
    }, [tasksArray])






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
            {dragProvided => {
                return (
                    <div
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}>

                        {/* <div ref={provided.innerRef}
                            {...provided.droppableProps}> */}
                        <div
                            className='column-drop-zone'>
                            <div className='column'>
                                <div
                                    // onClick={alphabetizeClick}
                                    className='column__header' {...dragProvided.dragHandleProps}>
                                    {name !== 'Completed' ?
                                        <>
                                            <AddTask
                                                columnId={columnId}
                                                taskArrLength={tasksArray.length} />
                                            <div className='column__name'>{name}</div>
                                            <div className='alphabetize' onClick={alphabetizeClick}>ABC</div>
                                            <DeleteColumn columnId={columnId} />
                                        </> :
                                        <>
                                            <div><Trash className='trash-can' onClick={clearCompleted} /></div>
                                            <div className='completed-name'>{name}</div>

                                        </>}
                                </div>
                                <Droppable droppableId={`${columnId}`} type='task'>
                                    {(provided) => {
                                        return (

                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className='tasks-container'>
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
                                                        topTask={topTask}
                                                        // taskRefArr={taskRefArr}
                                                        // setTaskRefArr={setTaskRefArr}
                                                        taskRef={taskRefs[i]}
                                                    />)

                                                })}

                                            </div>)
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    </div>



                    // </div>
                )
            }}

        </Draggable >
    )

    // return (
    //     <Draggable draggableId={`column-${columnId}`} index={columnDropZoneId}>
    //         {dragProvided => {
    //             return (
    //                 <div
    //                     {...dragProvided.draggableProps}
    //                     ref={dragProvided.innerRef}>
    //                     <Droppable droppableId={`${columnId}`} type='task'>
    //                         {(provided) => {
    //                             return (
    //                                 <div ref={provided.innerRef}
    //                                     {...provided.droppableProps}>
    //                                     <div
    //                                         className='column-drop-zone'>
    //                                         <div className='column'>
    //                                             <div
    //                                                 // onClick={alphabetizeClick}
    //                                                 className='column__header' {...dragProvided.dragHandleProps}>
    //                                                 {name !== 'Completed' ?
    //                                                     <>
    //                                                         <AddTask
    //                                                             columnId={columnId}
    //                                                             taskArrLength={tasksArray.length} />
    //                                                         <div className='column__name'>{name}</div>
    //                                                         <DeleteColumn columnId={columnId} />
    //                                                     </> :
    //                                                     <>
    //                                                         <div><Trash className='trash-can' onClick={clearCompleted} /></div>
    //                                                         <div className='completed-name'>{name}</div>

    //                                                     </>}
    //                                             </div>
    //                                             <div className='tasks-container'>
    //                                                 {tasksArray.map((task, i) => {
    //                                                     // if (i === tasksArray.length - 1) {
    //                                                     //     return
    //                                                     // }

    //                                                     return (<Task
    //                                                         key={task.id}
    //                                                         taskid={task.id}
    //                                                         taskdropzoneid={i}
    //                                                         heading={task.heading}
    //                                                         description={task.description}
    //                                                         currentlyDragging={currentlyDragging}
    //                                                         setCurrentlyDragging={setCurrentlyDragging}
    //                                                         columnId={task.columnId}
    //                                                         taskArrLength={tasksArray.length}
    //                                                         topTask={topTask}
    //                                                         // taskRefArr={taskRefArr}
    //                                                         // setTaskRefArr={setTaskRefArr}
    //                                                         taskRef={taskRefs[i]}
    //                                                     />)

    //                                                 })}

    //                                             </div>

    //                                         </div>
    //                                     </div>
    //                                     {provided.placeholder}
    //                                 </div>)
    //                         }}
    //                     </Droppable>


    //                 </div>
    //             )
    //         }}

    //     </Draggable >
    // )
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