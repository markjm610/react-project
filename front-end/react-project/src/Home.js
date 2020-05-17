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
import AddColumn from './AddColumn';
import AddProject from './AddProject';

import { useDrop } from 'react-dnd';

import { ItemTypes } from './ItemTypes';




const Home = () => {

    const { invites, setInvites, setProjectArr } = useContext(Context);


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
        async function fetchProjects() {
            const projectRes = await fetch(`${apiBaseUrl}/users/${userId}/projects`);
            const parsedProjectRes = await projectRes.json();
            const projects = parsedProjectRes.projects.Projects;
            setProjectArr(projects)
        }
        fetchProjects();
    }, [invites])



    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        // drop: () => {
        //     handleDrop();
        // },
        // hover: (item) => {

        //     if (currentlyDragging === taskdropzoneid && item.columnId === columnId) {
        //         return
        //     }
        //     item.columnId = columnId;
        //     changePositions()

        // },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    return (
        <div id='home'>
            <div className='sidebar-left'>
                <UserDisplay></UserDisplay>
                <div className='project-stuff'>
                    <ProjectNavBar ></ProjectNavBar>
                    <AddProject></AddProject>
                </div>
                <LogOut></LogOut>
            </div>
            <div className='working-area' ref={drop}>
                <WorkingAreaRoutes isOver={isOver}></WorkingAreaRoutes>
            </div>
            <div className='sidebar-right'>
                <Invite></Invite>
                <ProjectMembers></ProjectMembers>
            </div>
        </div>
    )

}

export default Home;