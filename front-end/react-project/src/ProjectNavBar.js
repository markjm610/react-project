import React from 'react';
import { NavLink } from 'react-router-dom'



const ProjectNavBar = ({ projectArr }) => {
    console.log(projectArr)
    return (
        <div className='navbar__navlinks'>
            {projectArr.map(({ id, name }, i) => {
                return <NavLink key={i} to={`/home/project/${id}`} id={id} name={name}>{name}</NavLink>
            }
            )}

        </div>
    )
}

export default ProjectNavBar;