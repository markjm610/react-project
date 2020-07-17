import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'
import { apiBaseUrl } from './config';

const WorkingArea = () => {

    const { displayedColumns, updateColumns, draggingTaskId } = useContext(Context);
    // const [updatedColumns, setUpdatedColumns] = useState([])
    // useEffect(() => {
    //     // updateColumns changes
    //     // console.log(updateColumns)

    //     // // updateColumns[0].Tasks does not
    //     // console.log(updateColumns[0].Tasks)
    // }, [updateColumns])



    return (
        <>
            {

                displayedColumns.map(({ id, name, pagePosition, Tasks }, i) => {
                    // console.log(updateColumns)

                    return (<Column
                        key={id}
                        columnDropZoneId={i}
                        columnId={id}
                        name={name}
                        pagePosition={pagePosition}
                        tasksArray={Tasks}
                    />)
                })
            }
            {/* {updateColumns.map(column => {
                return (
                    <div className='highlight-container'
                    // style={
                    //     {
                    //         top: `-${column.Tasks.length * 60 + 5}px`
                    //     }}
                    >
                        {column.Tasks.map((task, i) => {
                            // console.log(updateTasksArray)
                            // console.log(i)
                            // console.log('task.id', task.id)
                            // console.log('draggingTaskId', draggingTaskId)
                            return (
                                <div key={`highlight-${task.id}`} className='highlight' style={{
                                    backgroundColor:
                                        task.id === draggingTaskId && 'lightgoldenrodyellow'
                                }} />
                            )
                        })}
                    </div>
                )
            })} */}

        </>

    )
}

export default WorkingArea;