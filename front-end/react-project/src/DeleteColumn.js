import React, { useState, useContext } from 'react';
import { FormClose } from 'grommet-icons';
import Context from './Context';
import { apiBaseUrl } from './config';
import { Layer } from 'grommet';

const DeleteColumn = ({ columnId }) => {

    const { displayedColumns, setDisplayedColumns, alphabetizing } = useContext(Context);
    const [columnEmpty, setColumnEmpty] = useState(true)
    const deleteColumnClick = async () => {
        if (alphabetizing) {
            return
        }

        const columnsCopy = [...displayedColumns];
        let empty = true;
        columnsCopy.forEach((column, i) => {
            if (column.id === columnId) {
                if (column.Tasks.length) {
                    empty = false
                } else {
                    columnsCopy.splice(i, 1)
                }

            }
        })
        if (empty) {
            columnsCopy.forEach((column, i) => {
                column.pagePosition = i;
            })

            setDisplayedColumns(columnsCopy)

            await fetch(`${apiBaseUrl}/columns/${columnId}`, {
                method: 'DELETE'
            })
        } else {
            setColumnEmpty(false)
        }

    }


    return (
        <>
            <div className='delete-column'>
                <FormClose color='black' onClick={deleteColumnClick}></FormClose>
            </div>
            {
                !columnEmpty && <Layer
                    onEsc={() => setColumnEmpty(true)}
                    onClickOutside={() => {
                        setColumnEmpty(true)
                    }}
                >
                    <div className='popup-container'>Column has to be empty before deleting.</div>
                </Layer>}
        </>
    );
}


export default DeleteColumn;