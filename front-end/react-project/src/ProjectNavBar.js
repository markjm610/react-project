import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';


const ProjectNavBar = () => {

    const { projectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId } = useContext(Context);

    return (
        <div className='navbar__navlinks'>
            {projectArr.map(({ id, name }, i) => {

                const handleProjectNavBarClick = async () => {

                    const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
                    const parsedUsersRes = await usersRes.json();

                    const res = await fetch(`${apiBaseUrl}/projects/${id}`);
                    const parsedRes = await res.json();
                    const columns = parsedRes.projectInfo.Columns;
                    columns.forEach(column => {
                        column.Tasks.push({ id: null, heading: null, description: null, columnPosition: column.Tasks.length, columnId: column.id })
                    })

                    setProjectMembers(parsedUsersRes.projects.Users || []);
                    setDisplayedColumns(columns);
                    setCurrentProjectId(id);

                }

                return <NavLink className='navlink'
                    style={{ textDecoration: 'none' }}
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