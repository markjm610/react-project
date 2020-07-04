import React, { useState, useEffect, useContext, useCallback } from 'react';
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
import * as tweenFunctions from "tween-functions";



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
        }
        // else if (type === 'project') {
        //     // if in main list, rearrange
        //     if (draggableId.startsWith('m')) {
        //         let copy = [...mainProjectArr];

        //         const moved = copy.splice(source.index, 1);

        //         copy.splice(destination.index, 0, moved[0])

        //         // copy.forEach((project, i) => {

        //         //     project.UsersProject.position = i;
        //         // })
        //         setMainProjectArr(copy);
        //     } else {
        //         // if in extra list, insert and remove last element from main list, 
        //         // then insert to beginning of extra list
        //         // what if drop on end of main list? 

        //         let mainCopy = [...mainProjectArr];
        //         let listCopy = [...listProjectArr]
        //         const moved = listCopy.splice(source.index, 1);

        //         mainCopy.splice(destination.index, 0, moved[0])

        //         const toOtherList = mainCopy.pop()
        //         console.log(toOtherList)
        //         listCopy.unshift(toOtherList)



        //         mainCopy.forEach((project, i) => {

        //             project.UsersProject.position = i;
        //         })

        //         listCopy.forEach((project, i) => {
        //             project.UsersProject.position = i + 5
        //         })

        //         console.log('mainCopy', mainCopy)
        //         console.log('listCopy', listCopy)


        //         setMainProjectArr(mainCopy)
        //         setListProjectArr(listCopy);
        //     }


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

    // let api;
    // const sensor = value => {
    //     api = value
    // }

    // const startDrag = targetRef => {
    //     const preDrag = api.tryGetLock("draggable-item");
    //     if (!preDrag) {
    //         return;
    //     }

    //     const endX =
    //         targetRef.current && targetRef.current.getBoundingClientRect().x;

    //     const start = { x: 0, y: 0 };
    //     const end = { x: endX, y: 0 };
    //     const drag = preDrag.fluidLift(start);



    // }

    // function App() {


    //     const startDrag = function start(targetRef) {
    //         

    //         const endX =
    //             targetRef.current && targetRef.current.getBoundingClientRect().x;

    //         const start = { x: 0, y: 0 };
    //         const end = { x: endX, y: 0 };
    //         const drag = preDrag.fluidLift(start);

    //         const points = [];

    //         for (let i = 0; i < 20; i++) {
    //             points.push({
    //                 x: tweenFunctions.easeOutCirc(i, start.x, end.x, 20),
    //                 y: tweenFunctions.easeOutCirc(i, start.y, end.y, 20)
    //             });
    //         }
    //         moveStepByStep(drag, points);
    //     };

    //     const [isDropped, setIsDropped] = useState(false);
    //     const target = useRef(null);

    //     return (
    //         <div className="App">
    //             <DragDropContext
    //                 enableDefaultSensors={false}
    //                 onDragStart={() => { }}
    //                 onDragEnd={e => {
    //                     console.log(e);
    //                     if (e.destination.droppableId === "endZone") {
    //                         setIsDropped(true);
    //                     }
    //                 }}
    //                 sensors={[useMyCoolSensor]}
    //             >
    //                 <Droppable droppableId="startZone" direction="horizontal">
    //                     {(provided, snapshot) => (
    //                         <div
    //                             className="Column"
    //                             ref={provided.innerRef}
    //                             style={getListStyle(snapshot.isDraggingOver)}
    //                         >
    //                             <Draggable draggableId="draggable-item" index={0}>
    //                                 {(provided, snapshot) => (
    //                                     <div
    //                                         ref={provided.innerRef}
    //                                         {...provided.draggableProps}
    //                                         {...provided.dragHandleProps}
    //                                         style={getItemStyle(
    //                                             snapshot.isDragging,
    //                                             provided.draggableProps.style
    //                                         )}
    //                                     >
    //                                         {!isDropped && <Item />}
    //                                     </div>
    //                                 )}
    //                             </Draggable>
    //                             {provided.placeholder}
    //                         </div>
    //                     )}
    //                 </Droppable>
    //                 <Droppable droppableId="endZone" direction="horizontal">
    //                     {(provided, snapshot) => (
    //                         <div
    //                             className="Column"
    //                             ref={provided.innerRef}
    //                             style={getListStyle(snapshot.isDraggingOver)}
    //                         >
    //                             <div ref={target}>
    //                                 {isDropped && <Item />}
    //                                 {provided.placeholder}
    //                             </div>
    //                         </div>
    //                     )}
    //                 </Droppable>
    //             </DragDropContext>
    //             <div>
    //                 <button
    //                     onClick={() => (isDropped ? setIsDropped(false) : startDrag(target))}
    //                 >
    //                     {isDropped ? "Reset" : "Move"}
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

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


    // function useMyCoolSensor(api) {
    //     const startDrag = function start() {
    //         const preDrag = api.tryGetLock("task-45");
    //         if (!preDrag) {
    //             return;
    //         }

    //         const drag = preDrag.fluidLift({ x: 0, y: 0 });
    //         const end = { x: 400, y: 500 };
    //         drag.move(end);
    //         drag.drop()
    //     };
    // }

    // function mySimpleSensor(api) {
    //     const preDrag = api.tryGetLock('task-45');
    //     // Could not get lock
    //     if (!preDrag) {
    //         return;
    //     }

    //     const drag = preDrag.snapLift();

    //     drag.moveDown();
    //     // drag.moveDown();
    //     // drag.moveDown();

    //     drag.drop();
    // }

    function useMyCoolSensor(api) {
        const start = useCallback(function start(event) {
            const preDrag = api.tryGetLock('task-47');

            if (!preDrag) {
                return;
            }
            const startSpot = { x: 0, y: 0 }
            const drag = preDrag.fluidLift(startSpot)


            // const drag = preDrag.snapLift();

            // console.log('drag', drag)

            const end = { x: 0, y: -300 }
            // drag.move(end)
            // drag.drop()

            const points = [];

            // we want to generate 20 points between the start and the end
            const numberOfPoints = 50;

            for (let i = 0; i < numberOfPoints; i++) {
                points.push({
                    x: tweenFunctions.easeOutCirc(i, startSpot.x, end.x, numberOfPoints),
                    y: tweenFunctions.easeOutCirc(i, startSpot.y, end.y, numberOfPoints)
                });
            }




            function moveStepByStep(drag, values) {
                requestAnimationFrame(() => {
                    const newPosition = values.shift();
                    drag.move(newPosition);
                    if (values.length) {
                        moveStepByStep(drag, values);
                    }
                    else {
                        drag.drop();
                    }
                });
            }

            moveStepByStep(drag, points)



        }, []);




        useEffect(() => {
            window.addEventListener('click', start);

            return () => {
                window.removeEventListener('click', start);
            };
        }, []);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} sensors={[useMyCoolSensor]}>
            <div id='home' onMouseUp={() => setDragRef(true)}>
                <div className='sidebar-left'>
                    {/* <UserDisplay></UserDisplay> */}
                    <AddProject></AddProject>
                    <div className='project-stuff'>
                        <ProjectNavBar ></ProjectNavBar>

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
                    <Invite></Invite>
                    <ProjectMembers></ProjectMembers>
                </div>
            </div>
        </DragDropContext>
    )

}

export default Home;