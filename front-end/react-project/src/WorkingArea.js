import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Column';
import Context from './Context';
import AddColumn from './AddColumn'
import { apiBaseUrl } from './config';

const WorkingArea = () => {

    const { displayedColumns } = useContext(Context);





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
                        columnArrayLength={displayedColumns.length}
                    />)
                })
            }

        </>

    )
}

export default WorkingArea;