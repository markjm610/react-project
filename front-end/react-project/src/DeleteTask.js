import React, { useState, useContext } from 'react';
import { FormClose } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';

const DeleteTask = ({ taskid, columnId }) => {
    const { displayedColumns, setDisplayedColumns } = useContext(Context);

    // console.log(taskid)


    const deleteTaskClick = async () => {

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach(column => {

            if (column.id === columnId) {
                console.log('column.id === columnId')
                column.Tasks.forEach((task, i) => {
                    if (task.id === taskid) {
                        console.log('task.id === taskid')
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
            <FormClose onClick={deleteTaskClick}></FormClose>
        </div>
    )
}

export default DeleteTask;