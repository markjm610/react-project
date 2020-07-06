import React, { useContext } from 'react';
import Context from './Context';
import { NavLink } from 'react-router-dom'
import { apiBaseUrl } from './config';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Draggable } from 'react-beautiful-dnd';

const ProjectNavMain = ({ id, name, position, dropZone }) => {

    const { bottomOfMain, dragProjectId, setDragProjectId, listProjectArr, setListProjectArr, mainProjectArr, setMainProjectArr, setProjectMembers, setDisplayedColumns, setCurrentProjectId, currentlyDraggingProject, setCurrentlyDraggingProject } = useContext(Context);

    const handleProjectNavLinkClick = async () => {

        const usersRes = await fetch(`${apiBaseUrl}/projects/${id}/users`);
        const parsedUsersRes = await usersRes.json();

        const res = await fetch(`${apiBaseUrl}/projects/${id}`);
        const parsedRes = await res.json();
        const columns = parsedRes.projectInfo.Columns;
        // columns.forEach(column => {
        //     column.Tasks.push({ id: null, heading: null, description: null, columnPosition: column.Tasks.length, columnId: column.id })
        // })

        setProjectMembers(parsedUsersRes.projects.Users || []);
        setDisplayedColumns(columns);
        setCurrentProjectId(id);

    }



    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.PROJECT, id, isMain: true },
        begin: () => {
            setCurrentlyDraggingProject(dropZone)
        },
        end: (item) => {
            handleDrop()
            setDragProjectId(null)
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })



    const changePositions = (item) => {


        // if (columnDropZoneId === columnArrLength - 1) {
        //     return;
        // }
        // const saveId = dragTaskId;

        if (item.isMain) {
            const drag = currentlyDraggingProject;

            // let startingColumn;

            let copy = [...mainProjectArr];

            const moved = copy.splice(drag, 1);

            copy.splice(dropZone, 0, moved[0])

            copy.forEach((project, i) => {
                project.UsersProject.position = i;
            })


            // setDragColumnId(dragColumnId);

            setMainProjectArr(copy);

            setCurrentlyDraggingProject(dropZone);
            // setDragTaskId(saveId);
        } else {
            item.isMain = true
            const drag = currentlyDraggingProject

            let mainCopy = [...mainProjectArr]
            let listCopy = [...listProjectArr]

            const moved = listCopy.splice(drag, 1)


            mainCopy.splice(dropZone, 0, moved[0])



            const toList = mainCopy.pop()

            listCopy.unshift(toList)

            mainCopy.forEach((project, i) => {

                project.UsersProject.position = i;
            })

            listCopy.forEach((project, i) => {
                project.UsersProject.position = i + 5
            })

            console.log('mainCopy', mainCopy)
            console.log('listCopy', listCopy)

            setCurrentlyDraggingProject(dropZone);
            setListProjectArr(listCopy);
            setMainProjectArr(mainCopy)


        }


    }


    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.PROJECT,
        drop: (item) => {
            changePositions(item)
        },
        hover: (item) => {
            // console.log('hover')
            if (dragProjectId !== item.id) {
                setDragProjectId(item.id)
            }
            // console.log(currentlyDraggingProject)

            if (currentlyDraggingProject === dropZone && item.isMain === true) {

                return
            }


        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })


    const handleDrop = async (item) => {
        // console.log('handle drop')
        // let sendArr = [...mainProjectArr];
        // let listCopy = [...listProjectArr]

        // sendArr.push(...listCopy)


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


    // return (
    //     <>

    //         <div
    //             ref={drop}
    //             style={{
    //                 height: '10px',
    //                 backgroundColor: isOver && 'yellow'
    //             }} />
    //         <NavLink
    //             className='navlink'
    //             to={`/home/project/${id}`}
    //             onClick={handleProjectNavLinkClick}
    //             style={
    //                 {
    //                     textDecoration: 'none'
    //                 }}>


    //             <div
    //                 // ref={drag}
    //                 className='project-navlink'
    //                 style={
    //                     {
    //                         textDecoration: 'none',
    //                         opacity: (isDragging || (!isDragging && (dragProjectId === id))) ? 0 : 1
    //                     }}>
    //                 {name}
    //             </div>
    //         </NavLink>
    //     </>
    // )

    if (dropZone === mainProjectArr.length - 1) {
        return (
            // <div ref={drop}>
            <Draggable
                draggableId={`main-${id}`}
                index={dropZone}
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
                                    className='project-navlink'
                                    style={
                                        {
                                            textDecoration: 'none',
                                            opacity: isDragging ? 0 : 1
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
                                    className='project-navlink'
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