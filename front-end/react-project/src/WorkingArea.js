import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'
import { apiBaseUrl } from './config';

const WorkingArea = () => {

    const { setDisplayedColumns, displayedColumns } = useContext(Context);
    const [currentlyDragging, setCurrentlyDragging] = useState(null)

    // const onDragEnd = async (result) => {
    //     const { destination, source, draggableId } = result

    //     if (!destination) {
    //         return
    //     }

    //     if (destination.droppableId === source.droppableId && destination.index === source.index) {
    //         return
    //     }

    //     let copy = [...displayedColumns];

    //     if (destination.droppableId === source.droppableId) {
    //         let startingColumn;
    //         copy.forEach(column => {
    //             if (`${column.id}` === destination.droppableId) {
    //                 startingColumn = column.Tasks.slice();
    //             }
    //         })

    //         const moved = startingColumn.splice(source.index, 1);
    //         startingColumn.splice(destination.index, 0, moved[0])
    //         copy.forEach(column => {
    //             if (`${column.id}` === destination.droppableId) {
    //                 column.Tasks = startingColumn;
    //                 column.Tasks.forEach((task, i) => {
    //                     task.columnPosition = i;
    //                 })
    //             }
    //         })

    //         // setDragColumnId(dragColumnId);
    //         setDisplayedColumns(copy);
    //         // setCurrentlyDragging(taskdropzoneid);
    //         // setDragTaskId(saveId);
    //     } else {

    //         // const saveDragColumnId = dragColumnId;
    //         // const saveId = dragTaskId;



    //         let startingColumn;

    //         copy.forEach(column => {
    //             if (`${column.id}` === source.droppableId) {
    //                 startingColumn = column.Tasks.slice();
    //             }
    //         })

    //         let newColumn;

    //         copy.forEach(column => {
    //             if (`${column.id}` === destination.droppableId) {
    //                 newColumn = column.Tasks.slice();
    //             }
    //         })


    //         const moved = startingColumn.splice(source.index, 1)


    //         newColumn.splice(destination.index, 0, moved[0])


    //         // Reassign columnId of dragged task, now in its new spot
    //         newColumn[destination.index].columnId = parseInt(destination.droppableId)

    //         // console.log(newColumn[destination.index].columnId)

    //         copy.forEach(column => {
    //             if (`${column.id}` === destination.droppableId) {
    //                 column.Tasks = newColumn;
    //                 column.Tasks.forEach((task, i) => {
    //                     task.columnPosition = i;
    //                 })

    //             } else if (`${column.id}` === source.droppableId) {
    //                 column.Tasks = startingColumn;
    //                 column.Tasks.forEach((task, i) => {
    //                     task.columnPosition = i;
    //                 })

    //             }
    //         })


    //         setDisplayedColumns(copy);

    //     }


    //     let sendArr = [];


    //     copy.forEach(column => {
    //         if (`${column.id}` === destination.droppableId) {
    //             // console.log('column.id === columnId')
    //             sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
    //         } else if (`${column.id}` === source.droppableId) {
    //             // console.log('column.id === item.columnId')
    //             sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
    //         }
    //     })

    //     // console.log(sendArr)

    //     try {
    //         const res = await fetch(`${apiBaseUrl}/tasks`, {
    //             method: 'PUT',
    //             body: JSON.stringify({ sendArr }),
    //             headers: {
    //                 "Content-Type": 'application/json',
    //             }
    //         })
    //         console.log(await res.json())
    //     } catch (e) {
    //         console.error(e)
    //     }


    // }


    return (
        <>
            {
                displayedColumns.map(({ id, name, pagePosition, Tasks }, i) => {
                    return (<Column
                        key={id}
                        columnDropZoneId={i}
                        columnId={id}
                        name={name}
                        pagePosition={pagePosition}
                        tasksArray={Tasks}
                        currentlyDragging={currentlyDragging}
                        setCurrentlyDragging={setCurrentlyDragging}
                    />)
                })
            }
            < AddColumn ></AddColumn >
        </>

    )
}

export default WorkingArea;