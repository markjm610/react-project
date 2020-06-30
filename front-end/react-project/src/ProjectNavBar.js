import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import ProjectNavMain from './ProjectNavMain';
import ProjectNavList from './ProjectNavList';


const ProjectNavBar = () => {

    const { mainProjectArr, listProjectArr } = useContext(Context);



    return (
        <div className='navbar__navlinks'>
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
            {listProjectArr.map(({ id, name, position }, i) => {
                return <ProjectNavList id={id} dropZone={i} key={id} position={position} name={name} />
            })}
        </div >
    )
}

export default ProjectNavBar;