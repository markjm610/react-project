import React from 'react'
import { Github, Linkedin } from 'grommet-icons'
const Links = () => {
    return (

        <div className='links-container'>
            <a href='https://github.com/markjm610'>
                <Github color='steelblue' style={{ marginRight: '10px' }} />
            </a>
            <a href='https://www.linkedin.com/in/markmansolino/'>
                <Linkedin color='steelblue' style={{ marginLeft: '10px' }} />
            </a>
        </div>
    )
}

export default Links