import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import ProjectNavMain from './ProjectNavMain';


const ProjectNavBar = () => {

    const { projectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId } = useContext(Context);



    return (
        <div className='navbar__navlinks'>
            {projectArr.map(({ id, name, UsersProject: { position } }, i) => {

                return (
                    <ProjectNavMain
                        dropZone={i}
                        key={id}
                        to={`/home/project/${id}`}
                        id={id}
                        name={name}
                        position={position}
                    />
                )

            }
            )}
            {/* {projectArr.map(({ id }, i) => {
                if (i >= 5) {
                    return <div key={id}>{i}</div>
                }
            })} */}
        </div >
    )
}

export default ProjectNavBar;