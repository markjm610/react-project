import React, { useState, useContext, useEffect } from 'react';
import { Add } from 'grommet-icons';
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'

import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';




const WorkingArea = () => {

    const { displayedColumns } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)

    const copy = [...displayedColumns];

    let taskArr = [];

    copy.forEach(column => {
        column.Tasks.forEach(task => {
            task.taskArrLength = column.Tasks.length;
            task.columnName = column.name;
            taskArr.push(task)
        })
    })
    console.log(taskArr)
    // console.log(arr)


    // taskArr.forEach(task => {
    //     if (task.columnPosition === 0) {
    //         // display column header before task
    //     } else {
    //         // display task
    //     }
    // })



    // return (<Column
    //     key={id}
    //     columnId={id}
    //     name={name}
    //     pagePosition={pagePosition}
    //     tasksArray={Tasks}
    //     currentlyDragging={currentlyDragging}
    //     setCurrentlyDragging={setCurrentlyDragging}

    // />)
    return (
        taskArr.map(task => {
            if (task.columnPosition === 0) {
                return (
                    <>
                        <div key={task.columnId} className='column__header'>
                            <AddTask
                                key={task.columnId + 1}
                                columnId={task.columnId}
                                taskArrLength={task.taskArrLength}></AddTask>
                            <div key={task.columnId + 2} className='column__name'>{task.columnName}</div>
                            <DeleteColumn key={task.columnId + 3} columnId={task.columnId}></DeleteColumn>
                        </div>
                        <Task
                            key={`${task.columnId}${task.id}`}
                            taskid={task.id}
                            taskdropzoneid={task.columnPosition}
                            heading={task.heading}
                            description={task.description}
                            currentlyDragging={currentlyDragging}
                            setCurrentlyDragging={setCurrentlyDragging}
                            columnId={task.columnId}
                            taskArrLength={task.taskArrLength}

                        ></Task>
                    </>
                )
            } else {
                return (
                    <Task
                        key={`${task.columnId}${task.id}`}
                        taskid={task.id}
                        taskdropzoneid={task.columnPosition}
                        heading={task.heading}
                        description={task.description}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                        columnId={task.columnId}
                        taskArrLength={task.taskArrLength}

                    ></Task>
                )
            }
        })
    )
    // return (
    //     <>
    //         <div key={columnId} className='column__header'>
    //             <AddTask
    //                 key={columnId}
    //                 columnId={columnId}
    //                 taskArrLength={tasksArray.length}></AddTask>
    //             <div key={columnId + 1} className='column__name'>{name}</div>
    //             <DeleteColumn key={columnId + 3} columnId={columnId}></DeleteColumn>
    //         </div>
    //     </>
    // )



    // return (
    //     <>
    //         {displayedColumns.map(({ id, name, pagePosition, Tasks }, i) => {

    //             return (<Column
    //                 key={id}
    //                 columnId={id}
    //                 name={name}
    //                 pagePosition={pagePosition}
    //                 tasksArray={Tasks}
    //                 currentlyDragging={currentlyDragging}
    //                 setCurrentlyDragging={setCurrentlyDragging}

    //             />)
    //         })}
    //         {/* <AddColumn></AddColumn> */}
    //     </>
    // )
}

export default WorkingArea;