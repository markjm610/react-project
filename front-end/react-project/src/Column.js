import React, { useContext } from 'react';
import Task from './Task';
import { Add, Close } from 'grommet-icons'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import Context from './Context';


const Column = ({ columnId, currentlyDragging, setCurrentlyDragging }) => {

    const { appState, setAppState } = useContext(Context);
    // const [currentlyDragging, setCurrentlyDragging] = useState(null)




    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.COLUMN },
        begin: () => {
            console.log('drag column begin')
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.COLUMN,
        drop: () => console.log('drop column'),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    return (
        <>
            <div className='column-drop-zone' ref={drop}>
                <div className='column' ref={drag}>
                    <div className='column__header'>
                        <div className='add-column'><Add></Add></div>
                        <div className='column__name'>Column Name</div>
                        <div className='delete-column'><Close></Close></div>
                    </div>
                    {appState[columnId].map((task, i) => <Task
                        key={i}
                        taskid={task.taskId}
                        taskdropzoneid={i}
                        heading={task.heading}
                        description={task.description}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                        columnId={task.columnId}
                        taskArrLength={appState[columnId].length}
                    // dragColumnId={dragColumnId}
                    // setDragColumnId={setDragColumnId}
                    ></Task>)}

                </div>
            </div>
        </>
    )
}

export default Column;