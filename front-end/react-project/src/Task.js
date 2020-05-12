import React, { useState, useContext, useRef, useCallback } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';

const Task = ({ columnId, currentlyDragging, setCurrentlyDragging, taskId, taskDropZoneId, heading, description }) => {

    const { appState, setAppState } = useContext(Context);

    // const [currentlyDragging, setCurrentlyDragging] = useState(null);

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskId, taskDropZoneId },
        begin: () => {
            setCurrentlyDragging(taskDropZoneId);
            setAppState({ ...appState, dragColumnId: columnId })
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const changePositions = () => {

        if (appState.dragColumnId === columnId) {
            const drag = currentlyDragging;
            setCurrentlyDragging(taskDropZoneId)
            const startingColumn = appState[columnId].slice();
            const moved = startingColumn.splice(drag, 1);
            startingColumn.splice(taskDropZoneId, 0, moved[0])
            setAppState({ ...appState, [columnId]: startingColumn })
        } else {
            const drag = currentlyDragging;
            setCurrentlyDragging(taskDropZoneId)
            const startingColumn = appState[appState.dragColumnId].slice();

            const newColumn = appState[columnId].slice();


            const moved = startingColumn.splice(drag, 1)



            newColumn.splice(taskDropZoneId, 0, moved[0])

            console.log(appState.dragColumnId)
            setAppState({ ...appState, [appState.dragColumnId]: startingColumn })
            console.log(startingColumn);
            console.log(appState[appState.dragColumnId])
            setAppState({ ...appState, [columnId]: newColumn })
        }


        // setAppState({ ...appState, dragColumnId: null })
    }

    // const changePositionsUseCB = useCallback(
    //     changePositions, [appState[appState.dragColumnId]]
    // )
    const ref = useRef(null)

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            // changePositions()
        },
        hover: () => {

            console.log(currentlyDragging);
            if (currentlyDragging === taskDropZoneId) {
                return
            }
            changePositions()

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    drop(ref)

    return (

        <div className='task-drop-zone' ref={ref} taskDropZoneId={taskDropZoneId}>
            <div className='task' ref={drag} taskId={taskId}>
                <div className='task__heading'>{heading}</div>
                <div className='task__description'>{description}</div>
            </div>
        </div>

    )
}

export default Task;