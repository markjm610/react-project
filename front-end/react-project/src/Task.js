import React, { useState, useContext, useRef, useCallback } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';

const Task = ({ taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const { appState, setAppState } = useContext(Context);


    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskid, taskdropzoneid },
        begin: () => {
            setCurrentlyDragging(taskdropzoneid);
            setAppState({ ...appState, dragColumnId: columnId })
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const changePositions = () => {

        if (appState.dragColumnId === columnId) {

            const drag = currentlyDragging;
            setCurrentlyDragging(taskdropzoneid)
            const startingColumn = appState[columnId].slice();
            const moved = startingColumn.splice(drag, 1);
            startingColumn.splice(taskdropzoneid, 0, moved[0])

            setAppState({ ...appState, [columnId]: startingColumn })

        } else {
            const drag = currentlyDragging;
            console.log('drag=', drag);
            setCurrentlyDragging(taskdropzoneid)
            const startingColumn = appState[appState.dragColumnId].slice();

            const newColumn = appState[columnId].slice();


            const moved = startingColumn.splice(drag, 1)


            newColumn.splice(taskdropzoneid, 0, moved[0])
            newColumn[taskdropzoneid].columnId = columnId;

            setAppState({ ...appState, [appState.dragColumnId]: startingColumn, [columnId]: newColumn })

        }


    }

    // const ref = useRef(null)

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            // changePositions()
        },
        hover: () => {
            console.log('currentlyDragging=', currentlyDragging);
            console.log('taskdropzoneid=', taskdropzoneid);
            if (currentlyDragging === taskdropzoneid) {
                return
            }
            changePositions()

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    // drop(ref)
    if (taskdropzoneid === taskArrLength - 1) {
        return (
            <>
                <div className='task-drop-zone' ref={drop} taskdropzoneid={taskdropzoneid}>

                </div>

            </>
        )
    } else {
        return (

            <div className='task-drop-zone' ref={drop} taskdropzoneid={taskdropzoneid}>
                <div className='task' ref={drag} taskid={taskid} style={{
                    opacity: isOver ? 0 : 1
                }}>
                    <div className='task__heading'>{heading}</div>
                    <div className='task__description'>{description}</div>
                </div>
            </div>

        )
    }

}

export default Task;