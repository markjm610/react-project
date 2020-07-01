import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from 'grommet';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const LogInAndSignUp = () => {


    const onDragEnd = result => {

    }

    return (

        <Droppable
            direction='horizontal'
            droppableId='log-in'
            isCombineEnabled={true}
        >{provided => {
            return (
                <>
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Box className='log-in-sign-up-box'

                            width='600px'
                            height='600px'
                            round='large'
                        >
                            <div className='title-div'><div className='title'>Taskflow</div></div>

                        </Box >
                    </div>
                    {provided.placeholder}
                </>)
        }}
        </Droppable>
    )
}

export default LogInAndSignUp;