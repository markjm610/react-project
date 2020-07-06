import React, { useState, useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import ProjectNavMain from './ProjectNavMain';
import ProjectNavList from './ProjectNavList';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { BladesVertical, More } from 'grommet-icons';

const ProjectNavBar = () => {

    const { mainProjectArr, listProjectArr, showProjectList } = useContext(Context);



    // return (
    //     <>

    //         <div className='navbar__navlinks'>
    //             {mainProjectArr.map(({ id, name, UsersProject: { position } }, i) => {
    //                 return (
    //                     <ProjectNavMain
    //                         dropZone={i}
    //                         key={id}
    //                         // to={`/home/project/${id}`}
    //                         id={id}
    //                         name={name}
    //                         position={position}
    //                     />
    //                 )
    //             })}

    //         </div >
    //         <div style={{ display: 'flex', justifyContent: 'center' }}>
    //             <More onClick={() => setShowList(!showList)} className='more-projects' />
    //         </div>

    //         <div className='project-nav-list-container'>
    //             {showList && <div className='project-nav-list'>
    //                 {listProjectArr.map(({ id, name, position }, i) => {
    //                     return <ProjectNavList id={id} dropZone={i} key={id} position={position} name={name} />
    //                 })}
    //             </div>}

    //         </div>

    //     </>
    // )



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
            {/* <Droppable droppableId={'project-nav-list'} type='project'>
                {provided => {
                    return (
                        <div ref={provided.innerRef}
                            {...provided.droppableProps}
                            className='project-nav-list-container'>
                            {showProjectList && <div>
                                {listProjectArr.map(({ id, name, position }, i) => {
                                    return <ProjectNavList id={id} dropZone={i} key={id} position={position} name={name} />
                                })}
                            </div>}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable> */}
            {showProjectList && <div className='project-nav-list-container'>
                <Droppable droppableId={'project-nav-list'} type='project'>
                    {provided => {
                        return (
                            <>
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {listProjectArr.map(({ id, name, position }, i) => {
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