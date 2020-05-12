import React from 'react';



const ProjectMembers = () => {
    const memberArray = [0, 1, 2]
    return (
        <div className='project-members'>
            {memberArray.map(member => <div className='each-member'>Project Member</div>)}
        </div>
    )

}

export default ProjectMembers;