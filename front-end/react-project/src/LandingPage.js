import React, { useContext, useState } from 'react';
import './LandingPage.css';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import LogInForm from './LogInForm'
import Demo from './Demo';
import SignUpForm from './SignUpForm';
import Context from './Context'



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
        // keep track of positions in array of 3
        // swap on update

        // let copy = { ...formPositions };

        // for (let form in copy) {
        //     if (copy[form] === source.index) {
        //         copy[form] = destination.index
        //     } else if (copy[form] === destination.index) {
        //         copy[form] = source.index
        //     }
        // }
        // console.log(copy)
        // setFormPositions(copy)

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

        // Even if there's no destination, need to update positions so what's currently over the middle
        // shows form and others don't


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
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
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
                </div>
            </div>
        </DragDropContext>
    )
}



export default LandingPage;