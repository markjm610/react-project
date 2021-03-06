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
import { More, Tooltip } from 'grommet-icons';
import { useDrop } from 'react-dnd';
import LeaveProject from './LeaveProject'
import { ItemTypes } from './ItemTypes';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import * as tweenFunctions from "tween-functions";
import { moveStepByStep, noScroll, noScrollMoveToTop } from './utils'
import { Layer } from 'grommet';
import ProjectNavMain from './ProjectNavMain'
import AddInstructionalProject from './AddInstructionalProject';
import ControlSpeed from './ControlSpeed';
import SwitchMode from './SwitchMode'


const Home = ({ history }) => {

    const {
        setDisplayedColumns,
        displayedColumns,
        mainProjectArr,
        setMainProjectArr,
        listProjectArr,
        setListProjectArr,
        invites,
        setInvites,
        topOfList,
        bottomOfMain,
        sensorState,
        setSensorState,
        showProjectList,
        setShowProjectList,
        setSelectedProject,
        selectedProject,
        setProjectMembers,
        setCurrentProjectId,
        currentProjectId,
        updateColumns,
        setUpdateColumns,
        setDraggingTaskId,
        taskRefs,
        integrationMode
    } = useContext(Context);

    const [showInstructions, setShowInstructions] = useState(true)
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

            if (!selectedProject.id) {
                let projectObj = {}
                projects.forEach(project => {
                    projectObj[project.id] = false
                })
                setSelectedProject(projectObj)
            }

            const listProjectArr = projects.slice(5)
            setMainProjectArr(mainProjectArr)
            setListProjectArr(listProjectArr)
        }
        fetchProjects();
    }, [invites])

    useEffect(() => {
        async function displayFirstProject() {
            if (!currentProjectId) {

                if (mainProjectArr.length) {

                    const usersRes = await fetch(`${apiBaseUrl}/projects/${mainProjectArr[0].id}/users`);
                    const parsedUsersRes = await usersRes.json();

                    const res = await fetch(`${apiBaseUrl}/projects/${mainProjectArr[0].id}`);
                    const parsedRes = await res.json();
                    const columns = parsedRes.projectInfo.Columns;

                    let selectedProjectCopy = { ...selectedProject }
                    for (let projectId in selectedProjectCopy) {
                        if (projectId === `${mainProjectArr[0].id}`) {
                            selectedProjectCopy[projectId] = true
                        } else {
                            selectedProjectCopy[projectId] = false
                        }
                    }

                    let columnsCopy = []

                    columns.forEach((column, i) => {
                        columnsCopy.push({ Tasks: [], id: column.id })
                        column.Tasks.forEach(task => {
                            columnsCopy[i].Tasks.push(task.id)
                        })
                    })

                    setSelectedProject(selectedProjectCopy)
                    setProjectMembers(parsedUsersRes.projects.Users || []);
                    setDisplayedColumns(columns);
                    setUpdateColumns(columnsCopy)
                    setCurrentProjectId(mainProjectArr[0].id);
                    history.push(`/home/project/${mainProjectArr[0].id}`)
                }
            }
        }
        displayFirstProject()
    }, [mainProjectArr])




    const onDragEnd = async (result) => {
        const { destination, source, draggableId, type } = result


        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        if (type === 'task') {
            // console.log(destination)
            // console.log(source)
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

                setDisplayedColumns(copy);
                // setDragTaskId(saveId);
                // const workingArea = document.querySelector('.working-area')
                // workingArea.removeEventListener('scroll', noScroll);
                // workingArea.removeEventListener('scroll', noScrollMoveToTop);
            } else {

                const projectCopy = [...mainProjectArr, ...listProjectArr]

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
                if (!integrationMode) {
                    newColumn[destination.index].columnId = parseInt(destination.droppableId)
                } else {
                    newColumn[destination.index].columnId = destination.droppableId
                }



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

            // console.log(copy)
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
                let res;

                if (!integrationMode) {
                    res = await fetch(`${apiBaseUrl}/tasks`, {
                        method: 'PUT',
                        body: JSON.stringify({ sendArr }),
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    })
                } else {

                    res = await fetch(`${apiBaseUrl}/tasks/integration`, {
                        method: 'PUT',
                        body: JSON.stringify({ sendArr }),
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    })
                }

                // console.log(await res.json())
            } catch (e) {
                console.error(e)
            }

        } else if (type === 'column') {


            let copy = [...displayedColumns];



            const moved = copy.splice(source.index, 1);

            copy.splice(destination.index, 0, moved[0])

            copy.forEach((column, i) => {
                column.pagePosition = i;
            })

            setDisplayedColumns(copy);


            try {
                if (!integrationMode) {
                    await fetch(`${apiBaseUrl}/columns`, {
                        method: 'PUT',
                        body: JSON.stringify({ sendArr: copy }),
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    })

                } else {
                    await fetch(`${apiBaseUrl}/columns/integration`, {
                        method: 'PUT',
                        body: JSON.stringify({ sendArr: copy }),
                        headers: {
                            "Content-Type": 'application/json',
                        }
                    })
                }

            } catch (e) {
                console.error(e)
            }

        }
        else if (type === 'project') {
            console.log(result)
            // if (destination.droppableId === 'project-nav-list' && source.droppableId === 'project-nav-main') {
            //     return
            // }
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

                sendArr.push(...mainCopy)
                sendArr.push(...listCopy)
                setMainProjectArr(mainCopy)
                setListProjectArr(listCopy);
                console.log(sendArr)
            }



            try {
                // console.log(sendArr)
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

            if (!preDrag) {
                return;
            }

            const endX = topOfList.current.getBoundingClientRect().x - bottomOfMain.current.getBoundingClientRect().x
            const endY = topOfList.current.getBoundingClientRect().y - bottomOfMain.current.getBoundingClientRect().y



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




    return (
        <DragDropContext onDragEnd={onDragEnd} sensors={[sensorStateSetter]}>
            <div id='home'>
                <div className='sidebar-left'>
                    <AddInstructionalProject />
                    <UserDisplay />
                    <SwitchMode />
                    <div className='project-stuff'>
                        <AddProject />
                        <ProjectNavBar />
                        {listProjectArr.length !== 0 && <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                            <More color='black' className='more-projects' onClick={() => setShowProjectList(!showProjectList)} />
                        </div>}
                    </div>
                    <LogOut />
                </div>
                <Droppable droppableId={`working-area`} direction='horizontal' type='column'>
                    {provided => {
                        return (
                            <div
                                className='working-area'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <WorkingAreaRoutes />

                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>

                <div className='sidebar-right'>
                    <ControlSpeed />

                    <AddColumn />
                    <Invite />
                    <ProjectMembers />
                    <LeaveProject />
                </div>
            </div>
        </DragDropContext>
    )

}

export default Home;