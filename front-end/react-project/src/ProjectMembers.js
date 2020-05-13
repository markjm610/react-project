import React, { useContext } from 'react';
import Context from './Context';


const ProjectMembers = () => {
    // const memberArray = [0, 1, 2]
    const { appState: { projectMembers } } = useContext(Context);
    return (
        <div className='project-members'>
            {projectMembers.map(({ name }, i) => <div key={i} className='each-member'>{name}</div>)}
        </div>
    )

}

export default ProjectMembers;