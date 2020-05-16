import React from 'react';
import Task from './Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AddTask from './AddTask';
import DeleteColumn from './DeleteColumn';
// import Context from './Context';
// import { apiBaseUrl } from './config';

const Column = ({ isOver, tasksArray, name, pagePosition, columnId, currentlyDragging, setCurrentlyDragging }) => {



    return (
        <>
            <div key={columnId} className='column-drop-zone'>
                <div key={columnId + 1} className='column'>
                    <div key={columnId + 2} className='column__header'>
                        <AddTask
                            key={columnId + 3}
                            columnId={columnId}
                            taskArrLength={tasksArray.length}></AddTask>
                        <div key={columnId + 4} className='column__name'>{name}</div>
                        <DeleteColumn key={columnId + 5} columnId={columnId}></DeleteColumn>
                    </div>
                    <div key={columnId + 6} className='task-container'>
                        {tasksArray.map((task, i) => <Task
                            key={task.id}
                            taskid={task.id}
                            taskdropzoneid={i}
                            heading={task.heading}
                            description={task.description}
                            currentlyDragging={currentlyDragging}
                            setCurrentlyDragging={setCurrentlyDragging}
                            columnId={task.columnId}
                            taskArrLength={tasksArray.length}
                            isOver={isOver}

                        ></Task>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Column;