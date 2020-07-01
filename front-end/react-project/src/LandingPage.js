import React from 'react';
import './LandingPage.css';
import LogInAndSignUp from './LogInAndSignUp';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LogInForm from './LogInForm'
import Demo from './Demo';
import SignUpForm from './SignUpForm';

const LandingPage = () => {

    const onDragEnd = result => {

    }

    const onDragUpdate = result => {
        console.log('onDragUpdate')
        console.log(result)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <div className='landing-page'>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1>Taskflow</h1>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Droppable droppableId={'landing-page'} direction='horizontal'>
                            {provided => {
                                return (
                                    <>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className='sign-up-log-in-demo'>
                                                <Demo />
                                                <LogInForm />
                                                <SignUpForm />
                                            </div>
                                        </div>
                                        {provided.placeholder}
                                    </>
                                )
                            }}

                        </Droppable>
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}



export default LandingPage;