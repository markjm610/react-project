import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import WorkingAreaRoutes from './WorkingAreaRoutes';
import LogOut from './LogOut';
import ProjectMembers from './ProjectMembers';
import Invite from './Invite';
import UserDisplay from './UserDisplay';
import ProjectNavBar from './ProjectNavBar';
import Context from './Context';
import { apiBaseUrl } from './config';

const Home = () => {

    const { invites, setInvites } = useContext(Context);

    const [projectArr, setProjectArr] = useState([])

    const userId = localStorage.getItem('USER_ID');


    useEffect(() => {


        async function fetchInvites() {
            const inviteRes = await fetch(`${apiBaseUrl}/users/${userId}/invites`);
            const parsedInviteRes = await inviteRes.json()
            if (parsedInviteRes.invites) {
                let newInviteArray = [];
                parsedInviteRes.invites.forEach(invite => {
                    newInviteArray.push(invite);
                })
                setInvites(newInviteArray)
            }
        }
        fetchInvites();
    }, [])

    useEffect(() => {
        console.log('fetching projects')
        async function fetchProjects() {
            const projectRes = await fetch(`${apiBaseUrl}/users/${userId}/projects`);
            const parsedProjectRes = await projectRes.json();
            const projects = parsedProjectRes.projects.Projects;
            setProjectArr(projects)
        }
        fetchProjects();
    }, [invites])


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