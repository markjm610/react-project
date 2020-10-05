import React, { useContext } from 'react';
import Context from './Context';
// import { Accordion, AccordionPanel, Box, Text } from 'grommet';

const ProjectMembers = () => {

    const { integrationMode, projectMembers } = useContext(Context);

    if (!integrationMode) {
        return (
            <div className='project-members'>
                {projectMembers.map(({ name }, i) => {
                    return (
                        <div key={i} className='each-member'>{name}</div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className='project-members'>
                <div className='integration-description'>Changes to this project are reflected on <a href="https://trello.com/b/VlAlibRo/taskflow" target="_blank" rel="noopener noreferrer">this board</a>.</div>
                <div className='integration-description'>Add things, move things around, and check the Trello board to see your changes.</div>
            </div>
        )
    }

}

export default ProjectMembers;