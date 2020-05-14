import React, { useContext } from 'react';
import { FormClose } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';


const DeleteColumn = ({ columnId }) => {

    const { displayedColumns, setDisplayedColumns } = useContext(Context);

    const deleteColumnClick = async () => {

        const columnsCopy = [...displayedColumns];

        columnsCopy.forEach((column, i) => {
            if (column.id === columnId) {
                columnsCopy.splice(i, 1)
            }
        })

        columnsCopy.forEach((column, i) => {
            column.pagePosition = i;
        })

        setDisplayedColumns(columnsCopy)

        await fetch(`${apiBaseUrl}/columns/${columnId}`, {
            method: 'DELETE'
        })
    }


    return (
        <div className='delete-column'>
            <FormClose onClick={deleteColumnClick}></FormClose>
        </div>
    );
}


export default DeleteColumn;