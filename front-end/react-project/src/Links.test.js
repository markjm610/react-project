import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render, configure } from 'enzyme';
import Links from './Links'
import { Github, Linkedin } from 'grommet-icons'
// configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<Links />)
})

it('links to my GitHub with GitHub icon', () => {
    const wrapper = shallow(<Links />)
    const githubLink = <a href='https://github.com/markjm610'>
        <Github color='steelblue' style={{ marginRight: '10px' }} />
    </a>
    expect(wrapper.contains(githubLink)).toEqual(true)
})

it('links to my LinkedIn with LinkedIn icon', () => {
    const wrapper = shallow(<Links />)
    const linkedinLink = <a href='https://www.linkedin.com/in/markmansolino/'>
        <Linkedin color='steelblue' style={{ marginLeft: '10px' }} />
    </a>
    expect(wrapper.contains(linkedinLink)).toEqual(true)
})