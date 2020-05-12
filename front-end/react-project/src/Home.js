import React from 'react';
import './Home.css';
import NavBar from './NavBar';
import ProjectArea from './ProjectArea';
import { Route } from 'react-router-dom';
import LogOut from './LogOut';
import ProjectMembers from './ProjectMembers';
import Invite from './Invite';
import UserDisplay from './UserDisplay';

const Home = () => {

    const projectArr = [1, 2, 3]

    return (
        <>
            <div className='sidebar-left'>
                <UserDisplay></UserDisplay>
                <NavBar projectArr={projectArr}></NavBar>
                <LogOut></LogOut>
            </div>
            <div className='working-area'>
                <ProjectArea projectArr={projectArr}></ProjectArea>
            </div>
            <div className='sidebar-right'>
                <Invite></Invite>
                <ProjectMembers></ProjectMembers>
            </div>
        </>
    )

}

export default Home;