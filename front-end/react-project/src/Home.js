import React, { useState, useEffect } from 'react';
import './Home.css';
import WorkingAreaRoutes from './WorkingAreaRoutes';
import LogOut from './LogOut';
import ProjectMembers from './ProjectMembers';
import Invite from './Invite';
import UserDisplay from './UserDisplay';
import ProjectNavBar from './ProjectNavBar';
import { apiBaseUrl } from './config';

const Home = () => {

    // const projectArr = [1, 2, 3]

    const [projectArr, setProjectArr] = useState([])

    const userId = localStorage.getItem('USER_ID');

    useEffect(() => {
        async function fetchProjects() {
            const projectRes = await fetch(`${apiBaseUrl}/users/${userId}/projects`);
            const parsedProjectRes = await projectRes.json();
            const projects = parsedProjectRes.projects.Projects;
            setProjectArr(projects)
        }
        fetchProjects();
    }, [])



    return (
        <div id='home'>
            <div className='sidebar-left'>
                <UserDisplay></UserDisplay>
                <ProjectNavBar projectArr={projectArr}></ProjectNavBar>
                <LogOut></LogOut>
            </div>
            <div className='working-area'>
                <WorkingAreaRoutes projectArr={projectArr}></WorkingAreaRoutes>
            </div>
            <div className='sidebar-right'>
                <Invite></Invite>
                <ProjectMembers></ProjectMembers>
            </div>
        </div>
    )

}

export default Home;