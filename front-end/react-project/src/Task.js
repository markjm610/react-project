import React, { useState, useContext } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';

const Task = ({ columnId, currentlyDragging, setCurrentlyDragging, taskId, taskDropZoneId, heading, description }) => {
    // console.log(taskDropZoneId)
    const { appState, setAppState } = useContext(Context);

    // const [currentlyDragging, setCurrentlyDragging] = useState(null);

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK },
        begin: () => {
            setCurrentlyDragging(taskDropZoneId);
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const changePositions = () => {
        // Need to find columnId of drop target

        const newPositions = appState[columnId].slice();

        const moved = newPositions.splice(currentlyDragging, 1)

        newPositions.splice(taskDropZoneId, 0, moved[0])

        return newPositions;
    }


    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => setAppState({ ...appState, [columnId]: changePositions() }),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    return (

        <div className='task-drop-zone' ref={drop} taskDropZoneId={taskDropZoneId}>
            <div className='task' ref={drag} taskId={taskId}>
                <div className='task__heading'>{heading}</div>
                <div className='task__description'>{description}</div>
            </div>
        </div>

    )
}

export default Task;