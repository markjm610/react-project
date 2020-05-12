import React from 'react';
import { NavLink } from 'react-router-dom'



const NavBar = ({ projectArr }) => {
    return (
        <div className='navbar__navlinks'>
            {projectArr.map((projectId, i) => {
                return <NavLink key={i} to={`/home/project/${projectId}`}>Project {projectId}</NavLink>
            }
            )}

        </div>
    )
}

export default NavBar;