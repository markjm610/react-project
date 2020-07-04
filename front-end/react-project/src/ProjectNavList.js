import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Draggable } from 'react-beautiful-dnd';



const ProjectNavList = ({ id, name, position, dropZone }) => {

    const { mainProjectArr, setLinkDragging, dragProjectId, setDragProjectId, listProjectArr, setListProjectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId, currentlyDraggingProject, setCurrentlyDraggingProject } = useContext(Context);

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
            // setDragProjectId(id)
            // setLinkDragging(true)
        },
        end: (item) => {
            handleDrop()
            setDragProjectId(null)
            // setLinkDragging(false)
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })



    // const changePositions = () => {


    //     // if (columnDropZoneId === columnArrLength - 1) {
    //     //     return;
    //     // }
    //     // const saveId = dragTaskId;
    //     const drag = currentlyDraggingProject;

    //     // let startingColumn;

    //     let copy = [...listProjectArr];

    //     const moved = copy.splice(drag, 1);

    //     copy.splice(dropZone, 0, moved[0])

    //     copy.forEach((project, i) => {
    //         project.UsersProject.position = i;
    //     })



    //     // setDragColumnId(dragColumnId);

    //     setListProjectArr(copy);

    //     setCurrentlyDraggingProject(dropZone);
    //     // setDragTaskId(saveId);

    // }


    // const [{ isOver }, drop] = useDrop({
    //     accept: ItemTypes.PROJECT,
    //     drop: () => {
    //     },
    //     hover: (item) => {
    //         // console.log('hover')

    //         // if (taskid !== null && dragTaskId !== taskid) {
    //         //     setDragTaskId(taskid)
    //         // }

    //         if (currentlyDraggingProject === dropZone) {
    //             return
    //         }

    //         // item.columnId = columnId;
    //         changePositions()

    //     },
    //     collect: monitor => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // })


    const handleDrop = async (item) => {
        // console.log('handle drop')
        let sendArr = [...mainProjectArr];
        let listCopy = [...listProjectArr]

        sendArr.push(...listCopy)


        try {
            await fetch(`${apiBaseUrl}/projects`, {
                method: 'PUT',
                body: JSON.stringify({ sendArr }),
                headers: {
                    "Content-Type": 'application/json',
                }
            })

        } catch (e) {
            console.error(e)
        }
    }


    return (
        // <div ref={drop}>

        <NavLink
            className='navlink'
            to={`/home/project/${id}`}
            onClick={handleProjectNavLinkClick}
            style={
                {
                    textDecoration: 'none',
                }}>

            <div
                ref={drag}
                className='project-navlink'
                style={
                    {
                        textDecoration: 'none',
                        opacity: (isDragging || (!isDragging && (dragProjectId === id))) ? 0 : 1
                    }}>
                {name}
            </div>
        </NavLink>
        // </div>
    )


    // return (
    //     <Draggable
    //         draggableId={`list-${id}`}
    //         index={dropZone}
    //     >
    //         {(provided, snapshot) => {
    //             return (
    //                 <div {...provided.draggableProps}
    //                     {...provided.dragHandleProps}
    //                     ref={provided.innerRef}
    //                 >
    //                     <NavLink
    //                         className='navlink'
    //                         to={`/home/project/${id}`}
    //                         onClick={handleProjectNavLinkClick}
    //                         style={
    //                             {
    //                                 textDecoration: 'none',
    //                                 transitionDuration: snapshot.isDropAnimating && '0.001s'
    //                             }}>

    //                         <div
    //                             className='project-navlink'
    //                             style={
    //                                 {
    //                                     textDecoration: 'none',
    //                                     transitionDuration: snapshot.isDropAnimating && '0.001s'
    //                                 }}>
    //                             {name}
    //                         </div>

    //                     </NavLink>
    //                 </div>)
    //         }}
    //     </Draggable>
    // )
}

export default ProjectNavList;