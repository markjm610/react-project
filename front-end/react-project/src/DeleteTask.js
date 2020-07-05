import React, { useContext, useState } from 'react';
import { FormClose } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';

const DeleteTask = ({ taskid, columnId }) => {
    const { displayedColumns, setDisplayedColumns } = useContext(Context);




    const deleteTaskClick = async () => {
        await fetch(`${apiBaseUrl}/tasks/${taskid}`, {
            method: 'DELETE'
        })
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



    }





    return (
        <div className='delete-task'>
            <FormClose className='delete-task-icon'
                onClick={deleteTaskClick}
            ></FormClose>
        </div>
    )
}

export default DeleteTask;