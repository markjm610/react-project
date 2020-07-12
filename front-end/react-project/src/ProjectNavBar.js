import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import ProjectNavMain from './ProjectNavMain';
import ProjectNavList from './ProjectNavList';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BladesVertical, More } from 'grommet-icons';

const ProjectNavBar = () => {

    const { mainProjectArr, listProjectArr, showProjectList, topOfList } = useContext(Context);



    return (
        <>
            <Droppable droppableId={'project-nav-main'} type='project'>
                {provided => {
                    return (
                        <div className='navbar__navlinks'
                            ref={provided.innerRef}
                            {...provided.droppableProps}>

                            {mainProjectArr.map(({ id, name, UsersProject: { position } }, i) => {
                                return (
                                    <ProjectNavMain
                                        dropZone={i}
                                        key={id}
                                        // to={`/home/project/${id}`}
                                        id={id}
                                        name={name}
                                        position={position}
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </div >
                    )
                }}

            </Droppable>
            <div ref={topOfList} className='top-of-list' />
            {showProjectList && <div className='project-nav-list-container'>
                <Droppable droppableId={'project-nav-list'} type='project'>
                    {provided => {
                        return (
                            <>
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {listProjectArr.length !== 0 && listProjectArr.map(({ id, name, position }, i) => {
                                        return <ProjectNavList id={id} dropZone={i} key={id} position={position} name={name} />
                                    })}

                                </div>
                                {provided.placeholder}
                            </>
                        )
                    }}
                </Droppable>
            </div>}
        </>
    )
}

export default ProjectNavBar;