import React, { useState, useContext, useRef, useCallback } from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';

const Task = ({ taskArrLength, columnId, currentlyDragging, setCurrentlyDragging, taskid, taskdropzoneid, heading, description }) => {

    const { appState, setAppState } = useContext(Context);


    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK, taskid, taskdropzoneid, columnId },
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
            if (taskdropzoneid === taskArrLength - 1) {
                return;
            }
            const drag = currentlyDragging;
            setCurrentlyDragging(taskdropzoneid)
            const startingColumn = appState[columnId].slice();
            const moved = startingColumn.splice(drag, 1);
            startingColumn.splice(taskdropzoneid, 0, moved[0])

            setAppState({ ...appState, [columnId]: startingColumn })

        } else {

            const drag = currentlyDragging;
            const saveDragColumnId = appState.dragColumnId;


            setCurrentlyDragging(taskdropzoneid)
            const startingColumn = appState[saveDragColumnId].slice();

            const newColumn = appState[columnId].slice();

            const moved = startingColumn.splice(drag, 1)


            newColumn.splice(taskdropzoneid, 0, moved[0])
            newColumn[taskdropzoneid].columnId = columnId;

            setAppState({
                ...appState,
                [saveDragColumnId]: startingColumn,
                [columnId]: newColumn,
                dragColumnId: columnId
            })

        }


    }

    // const ref = useRef(null)

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => {
            // changePositions()
        },
        hover: (item) => {
            // console.log('currentlyDragging=', currentlyDragging);
            // console.log('taskdropzoneid=', taskdropzoneid);
            // console.log('item.columnId=', item.columnId)
            // console.log('columnId=', columnId)
            if (currentlyDragging === taskdropzoneid && item.columnId === columnId) {
                return
            }
            item.columnId = columnId;
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