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
import { Droppable, DragDropContext } from 'react-beautiful-dnd';




const Home = () => {

    const {
        setDisplayedColumns,
        displayedColumns,
        mainProjectArr,
        setMainProjectArr,
        listProjectArr,
        setListProjectArr,
        invites,
        setInvites,
        setDragRef } = useContext(Context);


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
            const mainProjectArr = projects.slice(0, 5)
            const listProjectArr = projects.slice(5)
            setMainProjectArr(mainProjectArr)
            setListProjectArr(listProjectArr)
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

    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result
        console.log(type)
        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        if (type === 'task') {

            let copy = [...displayedColumns];

            if (destination.droppableId === source.droppableId) {
                let startingColumn;
                copy.forEach(column => {
                    if (`${column.id}` === destination.droppableId) {
                        startingColumn = column.Tasks.slice();
                    }
                })

                const moved = startingColumn.splice(source.index, 1);
                startingColumn.splice(destination.index, 0, moved[0])
                copy.forEach(column => {
                    if (`${column.id}` === destination.droppableId) {
                        column.Tasks = startingColumn;
                        column.Tasks.forEach((task, i) => {
                            task.columnPosition = i;
                        })
                    }
                })

                // setDragColumnId(dragColumnId);
                setDisplayedColumns(copy);
                // setCurrentlyDragging(taskdropzoneid);
                // setDragTaskId(saveId);
            } else {

                // const saveDragColumnId = dragColumnId;
                // const saveId = dragTaskId;



                let startingColumn;

                copy.forEach(column => {
                    if (`${column.id}` === source.droppableId) {
                        startingColumn = column.Tasks.slice();
                    }
                })

                let newColumn;

                copy.forEach(column => {
                    if (`${column.id}` === destination.droppableId) {
                        newColumn = column.Tasks.slice();
                    }
                })


                const moved = startingColumn.splice(source.index, 1)


                newColumn.splice(destination.index, 0, moved[0])


                // Reassign columnId of dragged task, now in its new spot
                newColumn[destination.index].columnId = parseInt(destination.droppableId)

                // console.log(newColumn[destination.index].columnId)

                copy.forEach(column => {
                    if (`${column.id}` === destination.droppableId) {
                        column.Tasks = newColumn;
                        column.Tasks.forEach((task, i) => {
                            task.columnPosition = i;
                        })

                    } else if (`${column.id}` === source.droppableId) {
                        column.Tasks = startingColumn;
                        column.Tasks.forEach((task, i) => {
                            task.columnPosition = i;
                        })

                    }
                })


                setDisplayedColumns(copy);

            }


            let sendArr = [];


            copy.forEach(column => {
                if (`${column.id}` === destination.droppableId) {
                    // console.log('column.id === columnId')
                    // sendArr.push(...column.Tasks.slice(0, column.Tasks.length - 1))
                    sendArr.push(...column.Tasks)
                } else if (`${column.id}` === source.droppableId) {
                    // console.log('column.id === item.columnId')
                    sendArr.push(...column.Tasks)
                }
            })

            // console.log(sendArr)

            try {
                const res = await fetch(`${apiBaseUrl}/tasks`, {
                    method: 'PUT',
                    body: JSON.stringify({ sendArr }),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                })
                console.log(await res.json())
            } catch (e) {
                console.error(e)
            }

        } else if (type === 'column') {

            // const drag = currentlyDraggingColumn;

            // let startingColumn;

            let copy = [...displayedColumns];



            const moved = copy.splice(source.index, 1);

            copy.splice(destination.index, 0, moved[0])

            copy.forEach((column, i) => {
                column.pagePosition = i;
            })



            // setDragColumnId(dragColumnId);

            setDisplayedColumns(copy);

            // const sendArr = [...displayedColumns];


            try {
                await fetch(`${apiBaseUrl}/columns`, {
                    method: 'PUT',
                    body: JSON.stringify({ sendArr: copy }),
                    headers: {
                        "Content-Type": 'application/json',
                    }
                })

            } catch (e) {
                console.error(e)
            }
            // setCurrentlyDraggingColumn(columnDropZoneId);
            // setDragTaskId(saveId);
        } else if (type === 'project') {
            // if in main list, rearrange
            if (draggableId.startsWith('m')) {
                let copy = [...mainProjectArr];

                const moved = copy.splice(source.index, 1);

                copy.splice(destination.index, 0, moved[0])

                // copy.forEach((project, i) => {

                //     project.UsersProject.position = i;
                // })
                setMainProjectArr(copy);
            } else {
                // if in extra list, insert and remove last element from main list, 
                // then insert to beginning of extra list
                // what if drop on end of main list? 

                let mainCopy = [...mainProjectArr];
                let listCopy = [...listProjectArr]
                const moved = listCopy.splice(source.index, 1);

                mainCopy.splice(destination.index, 0, moved[0])

                const toOtherList = mainCopy.pop()
                console.log(toOtherList)
                listCopy.unshift(toOtherList)



                mainCopy.forEach((project, i) => {

                    project.UsersProject.position = i;
                })

                listCopy.forEach((project, i) => {
                    project.UsersProject.position = i + 5
                })

                console.log('mainCopy', mainCopy)
                console.log('listCopy', listCopy)


                setMainProjectArr(mainCopy)
                setListProjectArr(listCopy);
            }


            // setDragColumnId(dragColumnId);



            // use copy maybe
            // let sendArr = [...mainProjectArr];

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





    }

    // const onDragStart = (e) => {
    //     console.log(e)
    // }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div id='home' onMouseUp={() => setDragRef(true)}>
                <div className='sidebar-left'>
                    {/* <UserDisplay></UserDisplay> */}
                    <AddProject></AddProject>
                    <div className='project-stuff'>
                        <ProjectNavBar ></ProjectNavBar>

                    </div>
                    <LogOut></LogOut>
                </div>
                <Droppable droppableId={`working-area`} direction='horizontal' type='column'>
                    {provided => {
                        return (
                            <div
                                className='working-area'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <WorkingAreaRoutes isOver={isOver}></WorkingAreaRoutes>
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>

                <div className='sidebar-right'>
                    <Invite></Invite>
                    <ProjectMembers></ProjectMembers>
                </div>
            </div>
        </DragDropContext>
    )

}

export default Home;