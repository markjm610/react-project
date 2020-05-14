import React, { useContext } from 'react';
import Context from './Context';
// import { Accordion, AccordionPanel, Box, Text } from 'grommet';

const ProjectMembers = () => {

    const { projectMembers } = useContext(Context);

    return (
        <div className='project-members'>
            {projectMembers.map(({ name }, i) => {
                return (
                    <div key={i} className='each-member'>{name}</div>
                )
            })}
        </div>
    )

}

export default ProjectMembers;