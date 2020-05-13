import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';


const ProjectNavBar = ({ projectArr }) => {

    const { appState, setAppState } = useContext(Context);

    return (
        <div className='navbar__navlinks'>
            {projectArr.map(({ id, name }, i) => {

                const handleProjectNavBarClick = async () => {

                    const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
                    const parsedUsersRes = await usersRes.json();
                    const columnsRes = await fetch(`${apiBaseUrl}/projects/${id}/columns`);
                    const parsedColumnsRes = await columnsRes.json();

                    setAppState(
                        {
                            ...appState,
                            projectMembers: parsedUsersRes.projects.Users,
                            displayedColumns: parsedColumnsRes.columns
                        })
                }

                return <NavLink
                    key={i}
                    to={`/home/project/${id}`}
                    id={id}
                    name={name}
                    onClick={handleProjectNavBarClick}>
                    <div className='project-navlink'>{name}</div>

                </NavLink>
            }
            )}

        </div>
    )
}

export default ProjectNavBar;