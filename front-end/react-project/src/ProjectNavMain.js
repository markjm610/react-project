import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Draggable } from 'react-beautiful-dnd';

const ProjectNavMain = ({ id, name, position, dropZone }) => {

    const { alphabetizing, setUpdateColumns, selectedProject, setSelectedProject, bottomOfMain, dragProjectId, setDragProjectId, listProjectArr, setListProjectArr, mainProjectArr, setMainProjectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId, currentlyDraggingProject, setCurrentlyDraggingProject } = useContext(Context);

    const handleProjectNavLinkClick = async () => {
        if (alphabetizing) {
            return
        }
        const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
        const parsedUsersRes = await usersRes.json();

        const res = await fetch(`${apiBaseUrl}/projects/${id}`);
        const parsedRes = await res.json();
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



    // So ref to bottom project can be assigned
    if (dropZone === mainProjectArr.length - 1) {
        return (
            <Draggable
                draggableId={`main-${id}`}
                index={dropZone}
                isDragDisabled={!!alphabetizing}
            >
                {provided => {
                    return (
                        <div {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <NavLink
                                className='navlink'
                                to={`/home/project/${id}`}
                                onClick={handleProjectNavLinkClick}
                                style={
                                    {
                                        textDecoration: 'none'
                                    }}>


                                <div
                                    ref={bottomOfMain}
                                    className={selectedProject[id] ? 'selected-project-navlink' : 'project-navlink'}
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
    } else {
        return (
            <Draggable
                draggableId={`main-${id}`}
                index={dropZone}
                isDragDisabled={!!alphabetizing}
            >
                {provided => {
                    return (
                        <div {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            <NavLink
                                className='navlink'
                                to={`/home/project/${id}`}
                                onClick={handleProjectNavLinkClick}
                                style={
                                    {
                                        textDecoration: 'none'
                                    }}>
                                <div
                                    className={selectedProject[id] ? 'selected-project-navlink' : 'project-navlink'}
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

export default ProjectNavMain;