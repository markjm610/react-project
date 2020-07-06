import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
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
import { More } from 'grommet-icons';
import { useDrop } from 'react-dnd';
import LeaveProject from './LeaveProject'
import { ItemTypes } from './ItemTypes';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import * as tweenFunctions from "tween-functions";
import { moveStepByStep } from './utils'

// function moveStepByStep(drag, values) {
//     requestAnimationFrame(() => {
//         const newPosition = values.shift();
//         drag.move(newPosition);
//         if (values.length) {
//             moveStepByStep(drag, values);
//         } else {
//             drag.drop();
//         }
//     });
// }


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
        setDragRef,
        topOfList,
        bottomOfMain,
        sensorState,
        setSensorState,
        currentSortingTask,
        setCurrentSortingTask,
        alphabetizing,
        setAlphabetizing,
        currentSortedTaskArray,
        setCurrentSortedTaskArray,
        showProjectList,
        setShowProjectList
    } = useContext(Context);


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
        console.log(result)
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
                // console.log(await res.json())
            } catch (e) {
                console.error(e)
            }

            // } else if (type === 'task' && alphabetizing) {
            //     console.log('alphabetizing')

            // Find a non-matching index, run the animation, break
            // If all indexes match, set alphabetizing to false and stop

            // let copy = [...displayedColumns];

            // let currentColumn;

            // copy.forEach(column => {
            //     if (`${column.id}` === destination.droppableId) {
            //         currentColumn = column.Tasks.slice();
            //     }
            // })

            // let sortedCopy = [...currentSortedTaskArray]

            // for (let i = 0; i < sortedCopy.length; i++) {
            //     const sortedTask = sortedTaskCopy[i]
            //     if (sortedTask.heading === currentColumn[i].heading) {
            //         continue
            //     } else {
            //         let taskToMove;
            //         let taskIndexToMove;
            //         currentColumn.forEach((task, i) => {
            //             if (task.heading === sortedTask.heading) {
            //                 taskToMove = task
            //                 taskIndexToMove = i
            //             }

            //             const preDrag = sensorState.tryGetLock(`task-${taskToMove.id}`);


            //             const endX = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().x - taskRefs[i].current.getBoundingClientRect().x)

            //             const endY = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().y - taskRefs[i].current.getBoundingClientRect().y)

            //             const startSpot = { x: 0, y: 0 }
            //             const drag = preDrag.fluidLift(startSpot)

            //             const end = { x: endX, y: endY }

            //             const points = [];

            //             const numberOfPoints = 50;

            //             for (let i = 0; i < numberOfPoints; i++) {
            //                 points.push({
            //                     x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
            //                     y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
            //                 });
            //             }



            //             moveStepByStep(drag, points)

            //         })
            //     }
            // sortedCopy.forEach((sortedTask, i) => {
            //     if (sortedTask.heading === currentColumn[i].heading) {
            //         return
            //     } else {

            //         

            //         

            //     }

            //     // if (!preDrag) {
            //     //     return;
            //     // }


            // const endX = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().x - taskRefs[i].current.getBoundingClientRect().x)

            // const endY = -(taskRefs[taskIndexToMove].current.getBoundingClientRect().y - taskRefs[i].current.getBoundingClientRect().y)

            // // // const endX = target.current && target.current.getBoundingClientRect().x
            // // // const endY = target.current && target.current.getBoundingClientRect().y


            // const startSpot = { x: 0, y: 0 }
            // const drag = preDrag.fluidLift(startSpot)

            // const end = { x: endX, y: endY }

            // const points = [];

            // const numberOfPoints = 50;

            // for (let i = 0; i < numberOfPoints; i++) {
            //     points.push({
            //         x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
            //         y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
            //     });
            // }



            // moveStepByStep(drag, points)


            // })
        } else if (type === 'column') {

            // const drag = currentlyDraggingColumn;

            // let startingColumn;

            let copy = [...displayedColumns];



            const moved = copy.splice(source.index, 1);

            copy.splice(destination.index, 0, moved[0])

            copy.forEach((column, i) => {
                column.pagePosition = i;
            })

            setDisplayedColumns(copy);


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

        }
        else if (type === 'project') {


            let sendArr = []

            if (draggableId.startsWith('m') && destination.droppableId === 'project-nav-main') {

                let copy = [...mainProjectArr];

                const moved = copy.splice(source.index, 1);

                copy.splice(destination.index, 0, moved[0])

                copy.forEach((project, i) => {

                    project.UsersProject.position = i;
                })

                sendArr.push(...copy)
                sendArr.push(...listProjectArr)


                setMainProjectArr(copy);
            } else if (draggableId.startsWith('l') && destination.droppableId === 'project-nav-list') {
                let copy = [...listProjectArr];

                const moved = copy.splice(source.index, 1);

                copy.splice(destination.index, 0, moved[0])

                copy.forEach((project, i) => {
                    project.UsersProject.position = i + 5;
                })

                sendArr.push(...mainProjectArr)
                sendArr.push(...copy)

                setListProjectArr(copy);
            } else if (draggableId.startsWith('l') && destination.droppableId === 'project-nav-main') {

                let mainCopy = [...mainProjectArr];
                let listCopy = [...listProjectArr]
                const moved = listCopy.splice(source.index, 1);

                mainCopy.splice(destination.index, 0, moved[0])

                mainCopy.forEach((project, i) => {

                    project.UsersProject.position = i;
                })

                listCopy.forEach((project, i) => {
                    project.UsersProject.position = i + 5
                })

                // console.log('mainCopy', mainCopy)
                // console.log('listCopy', listCopy)
                sendArr.push(...mainCopy)
                sendArr.push(...listCopy)

                setMainProjectArr(mainCopy)
                setListProjectArr(listCopy);
            } else if (draggableId.startsWith('m') && destination.droppableId === 'project-nav-list') {
                let mainCopy = [...mainProjectArr];
                let listCopy = [...listProjectArr]
                const moved = mainCopy.splice(source.index, 1);

                listCopy.splice(destination.index, 0, moved[0])


                mainCopy.forEach((project, i) => {

                    project.UsersProject.position = i;
                })

                listCopy.forEach((project, i) => {
                    project.UsersProject.position = i + 5
                })

                // console.log('mainCopy', mainCopy)
                // console.log('listCopy', listCopy)

                sendArr.push(...mainCopy)
                sendArr.push(...listCopy)
                setMainProjectArr(mainCopy)
                setListProjectArr(listCopy);
            }

            // console.log(sendArr)

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
    }

    useEffect(() => {

        if (mainProjectArr.length > 5) {
            const preDrag = sensorState.tryGetLock(`main-${mainProjectArr[5].id}`);

            // if (!preDrag) {
            //     return;
            // }

            const endX = topOfList.current.getBoundingClientRect().x - bottomOfMain.current.getBoundingClientRect().x
            const endY = topOfList.current.getBoundingClientRect().y - bottomOfMain.current.getBoundingClientRect().y

            // const endX = target.current && target.current.getBoundingClientRect().x
            // const endY = target.current && target.current.getBoundingClientRect().y

            // console.log(target.current.getBoundingClientRect())
            // console.log(endX)
            // console.log(endY)


            const startSpot = { x: 0, y: 0 }
            const drag = preDrag.fluidLift(startSpot)

            const end = { x: endX, y: endY }
            // drag.move(end)
            // drag.drop()

            const points = [];

            const numberOfPoints = 15;

            for (let i = 0; i < numberOfPoints; i++) {
                points.push({
                    x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                    y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
                });
            }



            moveStepByStep(drag, points)
        }


    }, [mainProjectArr])




    function sensorStateSetter(api) {
        setSensorState(api)
    }


    const toTopClick = () => {

    }


    return (
        <DragDropContext onDragEnd={onDragEnd} sensors={[sensorStateSetter]}>
            <div id='home'>
                <div className='sidebar-left'>
                    {/* <UserDisplay></UserDisplay> */}
                    <AddProject></AddProject>
                    <div className='project-stuff'>
                        <ProjectNavBar ></ProjectNavBar>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <More className='more-projects' onClick={() => setShowProjectList(!showProjectList)} />
                        </div>
                    </div>
                    {/* <button onClick={() => startDrag()}>See if this works</button> */}
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
                    <Invite />
                    <ProjectMembers />
                    <LeaveProject />
                </div>
            </div>
        </DragDropContext>
    )

}

export default Home;