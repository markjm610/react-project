import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const TitleLetter = ({ letter, i, letterRef }) => {

    return (
        <Draggable draggableId={letter} index={i}>
            {provided => {
                return (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className='title' id={letter} ref={letterRef}>{letter}</div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default TitleLetter