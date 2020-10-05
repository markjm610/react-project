import React from 'react'
import { shallow, mount, render, configure } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Context from './Context'
import Task from './Task'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

it('renders with context and props', () => {
    const context = {
        sensorState: () => { },
        alphabetizing: false,
        scriptSpeed: 50
    }
    mount(
        <DragDropContext onDragEnd={() => { }}>
            <Droppable droppableId={'1'}>
                {provided => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <Context.Provider value={context}>
                                <Task key={10}
                                    taskid={10}
                                    taskdropzoneid={0}
                                    heading={'heading'}
                                    description={'description'}
                                    columnId={100}
                                    taskArrLength={1} />
                            </Context.Provider>
                        </div>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
})

it('displays the description provided through its props', () => {
    const context = {
        sensorState: () => { },
        alphabetizing: false,
        scriptSpeed: 50
    }
    const wrapper = mount(
        <DragDropContext onDragEnd={() => { }}>
            <Droppable droppableId={'1'}>
                {provided => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <Context.Provider value={context}>
                                <Task key={10}
                                    taskid={10}
                                    taskdropzoneid={0}
                                    description={'description'}
                                    columnId={100}
                                    taskArrLength={1} />
                            </Context.Provider>
                        </div>
                    )
                }}
            </Droppable>
        </DragDropContext>
    )
    expect(wrapper.contains(
        <div className='task__description'>
            description
        </div>
    )).toBe(true)
})