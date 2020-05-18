import React, { useContext, useState } from 'react';
import { FormClose } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';

const DeleteTask = ({ taskid, columnId }) => {
    const { displayedColumns, setDisplayedColumns } = useContext(Context);

    // const [allowTaskDelete, setAllowTaskDelete] = useState();

    // const handleMouseDown = () => {

    //     setAllowTaskDelete(true);
    //     // console.log(allowTaskDelete)
    // }


    const deleteTaskClick = async () => {
        // console.log(allowTaskDelete)

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach(column => {

            if (column.id === columnId) {
                column.Tasks.forEach((task, i) => {
                    if (task.id === taskid) {
                        column.Tasks.splice(i, 1)
                    }
                })

                column.Tasks.forEach((task, i) => {
                    task.columnPosition = i;
                })
            }
        })

        setDisplayedColumns(columnsCopy)

        await fetch(`${apiBaseUrl}/tasks/${taskid}`, {
            method: 'DELETE'
        })

    }





    return (
        <div className='delete-task'>
            <FormClose className='delete-task-icon'
                onMouseUp={deleteTaskClick}
            ></FormClose>
        </div>
    )
}

export default DeleteTask;