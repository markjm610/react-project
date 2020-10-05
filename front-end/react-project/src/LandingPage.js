import React, { useContext, useState } from 'react';
import './LandingPage.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LogInForm from './LogInForm'
import Demo from './Demo';
import SignUpForm from './SignUpForm';
import Context from './Context'
import TitleLetter from './TitleLetter'
import Title from './Title';
import Links from './Links';

const LandingPage = () => {

    const {
        formPositions,
        setFormPositions,
        updateFormPosition,
        setUpdateFormPosition,
        currentSourceIndex,
        setCurrentSourceIndex,
        noForms,
        setNoForms
    } = useContext(Context)

    const [startPositions, setStartPositions] = useState(null)


    const onDragEnd = result => {


        setNoForms(false)

        const { destination, source, draggableId } = result

        if (!destination) {
            const updateCopy = [...startPositions]
            setUpdateFormPosition(updateCopy)
            // setNoForms(false)
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        let copy = [...formPositions];

        const moved = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, moved[0])

        setFormPositions(copy)

    }

    const onDragUpdate = result => {

        const { destination, source, draggableId } = result


        if (!destination) {

            setNoForms(true)
            return
        }

        if (noForms) {
            setNoForms(false)
        }

        let copy = [...updateFormPosition];


        const moved = copy.splice(currentSourceIndex, 1);
        copy.splice(destination.index, 0, moved[0])

        setUpdateFormPosition(copy)



        setCurrentSourceIndex(destination.index)
    }

    const onDragStart = (initial) => {
        const { source } = initial
        setCurrentSourceIndex(source.index)
        let updateCopy = [...updateFormPosition]
        setStartPositions(updateCopy)
    }

    return (

        <div className='landing-page'>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title />
                <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                        <Droppable droppableId={'landing-page'} direction='horizontal' type='forms'>
                            {provided => {
                                return (
                                    <>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className='sign-up-log-in-demo'>
                                                {formPositions.map((form, i) => {
                                                    if (form === 'demo') {
                                                        return <Demo key='demo' index={i} />
                                                    } else if (form === 'logIn') {
                                                        return <LogInForm key='logIn' index={i} />
                                                    } else if (form === 'signUp') {
                                                        return <SignUpForm key='signUp' index={i} />
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        {provided.placeholder}
                                    </>
                                )
                            }}

                        </Droppable>
                    </div>
                </DragDropContext>
                <Links />
            </div>
        </div>

    )
}



export default LandingPage;