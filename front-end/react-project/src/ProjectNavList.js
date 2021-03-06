import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Draggable } from 'react-beautiful-dnd';



const ProjectNavList = ({ id, name, position, dropZone }) => {

    const {
        integrationMode,
        setIntegrationMode,
        alphabetizing,
        setAlphabetizing,
        setUpdateColumns,
        selectedProject,
        setSelectedProject,
        topOfList,
        listProjectArr,
        setListProjectArr,
        setProjectMembers,
        setDisplayedColumns,
        setCurrentProjectId,
        currentlyDraggingProject,
        setCurrentlyDraggingProject
    } = useContext(Context);

    const handleProjectNavLinkClick = async () => {
        if (alphabetizing) {
            setAlphabetizing(false)
        }
        if (integrationMode) {
            setIntegrationMode(false)
        }
        const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
        const parsedUsersRes = await usersRes.json();

        const res = await fetch(`${apiBaseUrl}/projects/${id}`);
        const parsedRes = await res.json();
        // console.log(parsedRes)
        const columns = parsedRes.projectInfo.Columns;

        let selectedProjectCopy = { ...selectedProject }
        for (let projectId in selectedProjectCopy) {

            if (projectId === `${id}`) {
                selectedProjectCopy[projectId] = true
            } else {
                selectedProjectCopy[projectId] = false
            }
        }
        const columnsCopy = [...columns]
        setSelectedProject(selectedProjectCopy)
        setProjectMembers(parsedUsersRes.projects.Users || []);
        setDisplayedColumns(columns);

        setCurrentProjectId(id);
        setUpdateColumns(columnsCopy)
    }


    if (dropZone === 0) {
        return (
            <Draggable
                draggableId={`list-${id}`}
                index={dropZone}
                isDragDisabled={alphabetizing}
            >
                {(provided, { isDragging }) => {
                    return (
                        <div {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <NavLink
                                className='navlink'
                                to={`/home/project/${id}`}
                                onClick={handleProjectNavLinkClick}
                                style={
                                    {
                                        textDecoration: 'none'
                                    }}>

                                <div
                                    className={selectedProject[id] ? 'list-selected-project-navlink' : 'list-project-navlink'}
                                >
                                    {name}
                                </div>

                            </NavLink>
                        </div>)
                }}
            </Draggable>

        )
    } else {
        return (
            <Draggable
                draggableId={`list-${id}`}
                index={dropZone}
                isDragDisabled={alphabetizing}
            >
                {(provided, snapshot) => {
                    return (
                        <div {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <NavLink
                                className='navlink'
                                to={`/home/project/${id}`}
                                onClick={handleProjectNavLinkClick}
                                style={
                                    {
                                        textDecoration: 'none'
                                    }}>

                                <div
                                    className={selectedProject[id] ? 'list-selected-project-navlink' : 'list-project-navlink'}
                                    style={
                                        {
                                            textDecoration: 'none'
                                        }}>
                                    {name}
                                </div>

                            </NavLink>
                        </div>)
                }}
            </Draggable>
        )
    }

}

export default ProjectNavList;