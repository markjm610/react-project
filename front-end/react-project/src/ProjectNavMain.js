import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const ProjectNavMain = ({ id, name, position, dropZone }) => {

    const { mainProjectArr, setMainProjectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId, currentlyDraggingProject, setCurrentlyDraggingProject } = useContext(Context);

    const handleProjectNavLinkClick = async () => {

        const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
        const parsedUsersRes = await usersRes.json();

        const res = await fetch(`${apiBaseUrl}/projects/${id}`);
        const parsedRes = await res.json();
        const columns = parsedRes.projectInfo.Columns;
        columns.forEach(column => {
            column.Tasks.push({ id: null, heading: null, description: null, columnPosition: column.Tasks.length, columnId: column.id })
        })

        setProjectMembers(parsedUsersRes.projects.Users || []);
        setDisplayedColumns(columns);
        setCurrentProjectId(id);

    }



    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PROJECT, id },
        begin: () => {
            setCurrentlyDraggingProject(dropZone)
        },
        end: (item) => {
            handleDrop()
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })



    const changePositions = () => {


        // if (columnDropZoneId === columnArrLength - 1) {
        //     return;
        // }
        // const saveId = dragTaskId;
        const drag = currentlyDraggingProject;

        // let startingColumn;

        let copy = [...projectArr];

        const moved = copy.splice(drag, 1);

        copy.splice(dropZone, 0, moved[0])

        copy.forEach((project, i) => {
            project.UsersProject.position = i;
        })



        // setDragColumnId(dragColumnId);

        setProjectArr(copy);

        setCurrentlyDraggingProject(dropZone);
        // setDragTaskId(saveId);

    }


    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PROJECT,
        drop: () => {
        },
        hover: (item) => {

            if (currentlyDraggingProject === dropZone) {
                return
            }

            // item.columnId = columnId;
            changePositions()

        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    const handleDrop = async (item) => {
        // console.log('handle drop')
        let sendArr = [...mainProjectArr];

        // try {
        //     await fetch(`${apiBaseUrl}/projects`, {
        //         method: 'PUT',
        //         body: JSON.stringify({ sendArr }),
        //         headers: {
        //             "Content-Type": 'application/json',
        //         }
        //     })

        // } catch (e) {
        //     console.error(e)
        // }
    }





    return (
        <div ref={drop}>
            <NavLink
                className='navlink'
                to={`/home/project/${id}`}
                onClick={handleProjectNavLinkClick}
                style={
                    {
                        textDecoration: 'none'
                    }}>
                <div
                    ref={drag}
                    className='project-navlink'
                    style={
                        {
                            textDecoration: 'none',
                            opacity: isDragging ? 0 : 1
                        }}>
                    {name}
                </div>
            </NavLink>
        </div>
    )
}

export default ProjectNavMain;