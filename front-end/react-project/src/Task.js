import React from 'react';
// import { Add } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Task = () => {

    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.TASK },
        begin: () => console.log('drag task begin'),
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: () => console.log('drop task'),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    return (
        <>

            <div className='task-drop-zone' ref={drop}>
                <div className='task' ref={drag}>
                    <div className='task__heading'>Task heading</div>
                    <div className='task__description'>Task description will be here</div>
                </div>
            </div>

        </>
    )
}

export default Task;