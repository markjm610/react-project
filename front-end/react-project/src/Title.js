import React, { useState, useRef, useContext, useEffect } from 'react'
import TitleLetter from './TitleLetter'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Context from './Context'
import { moveStepByStep } from './utils'
import * as tweenFunctions from "tween-functions";


const Title = () => {

    const { letterPositions, setLetterPositions } = useContext(Context)
    const [titleSensor, setTitleSensor] = useState(null)
    const sortedTitle = ['T', 'A', 'S', 'K', 'F', 'L', 'O', 'W']

    const letterRefs = {
        0: useRef(null),
        1: useRef(null),
        2: useRef(null),
        3: useRef(null),
        4: useRef(null),
        5: useRef(null),
        6: useRef(null),
        7: useRef(null)
    }

    const titleSensorSetter = api => {
        setTitleSensor(api)
    }


    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        let copy = [...letterPositions];

        const moved = copy.splice(source.index, 1);
        copy.splice(destination.index, 0, moved[0])

        setLetterPositions(copy)
    }




    useEffect(() => {
        if (titleSensor) {

            for (let i = 0; i < sortedTitle.length; i++) {
                const sortedLetter = sortedTitle[i]
                if (sortedLetter === letterPositions[i]) {
                    continue
                } else {
                    let letterToMove;
                    let letterIndexToMove;
                    letterPositions.forEach((letter, i) => {
                        if (letter === sortedLetter) {
                            letterToMove = letter
                            letterIndexToMove = i
                        }
                    })

                    const preDrag = titleSensor.tryGetLock(`${letterToMove}`);

                    if (!preDrag) {
                        return;
                    }


                    const endX = -(letterRefs[letterIndexToMove].current.getBoundingClientRect().x - letterRefs[i].current.getBoundingClientRect().x)

                    const endY = -(letterRefs[letterIndexToMove].current.getBoundingClientRect().y - letterRefs[i].current.getBoundingClientRect().y)

                    // // const endX = target.current && target.current.getBoundingClientRect().x
                    // // const endY = target.current && target.current.getBoundingClientRect().y


                    const startSpot = { x: 0, y: 0 }
                    const drag = preDrag.fluidLift(startSpot)

                    const end = { x: endX, y: endY }

                    const points = [];

                    const numberOfPoints = 50;

                    for (let i = 0; i < numberOfPoints; i++) {
                        points.push({
                            x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                            y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
                        });
                    }


                    moveStepByStep(drag, points)



                    // break after each move so it only does one at a time
                    break
                }

            }
        }
    }, [titleSensor, letterPositions])




    return (

        <DragDropContext onDragEnd={onDragEnd} sensors={[titleSensorSetter]}>
            <Droppable droppableId={'landing-page-title'} direction='horizontal' type='letters'>
                {provided => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='title-container'
                        >
                            {letterPositions.map((letter, i) => {
                                return (
                                    <TitleLetter
                                        key={letter}
                                        letter={letter}
                                        i={i}
                                        letterRef={letterRefs[i]}
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </div>

                    )
                }}
            </Droppable>
        </DragDropContext>
    )

}

export default Title