import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import ProjectNavMain from './ProjectNavMain';
import ProjectNavList from './ProjectNavList';
import { Droppable } from 'react-beautiful-dnd';
import { BladesVertical, More } from 'grommet-icons';

const ProjectNavBar = () => {

    const { mainProjectArr, listProjectArr } = useContext(Context);



    return (
        <Droppable droppableId={'project-nav-bar'} type='project'>
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
                        {/* {listProjectArr.map(({ id, name, position }, i) => {
                            return <ProjectNavList id={id} dropZone={i} key={id} position={position} name={name} />
                        })} */}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <More />
                        </div>

                        {provided.placeholder}
                    </div >
                )
            }}

        </Droppable>
    )
}

export default ProjectNavBar;