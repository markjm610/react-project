import { Layer } from 'grommet';
import React, { useContext, useState } from 'react'
import { apiBaseUrl } from './config';
import Context from './Context';

const SwitchMode = () => {
    const {
        alphabetizing,
        setDisplayedColumns,
        integrationMode,
        setIntegrationMode,
        mainProjectArr,
        selectedProject,
        setSelectedProject,
        setProjectMembers,
        setCurrentProjectId,
        setUpdateColumns
    } = useContext(Context)
    const [show, setShow] = useState(false)
    const [clickedButton, setClickedButton] = useState(false)

    const switchModeClick = async () => {
        setClickedButton(true)
        if (!integrationMode) {
            const res = await fetch(`${apiBaseUrl}/projects/sync`)
            const { Columns } = await res.json()
            setDisplayedColumns(Columns)

            let selectedProjectCopy = { ...selectedProject }

            for (let projectId in selectedProjectCopy) {
                selectedProjectCopy[projectId] = false
            }
            setSelectedProject(selectedProjectCopy)
            setProjectMembers([])
        } else {
            // display top project on left
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
            const columnsCopy = [...columns]
            setSelectedProject(selectedProjectCopy)
            setProjectMembers(parsedUsersRes.projects.Users || []);
            setDisplayedColumns(columns);
            setCurrentProjectId(mainProjectArr[0].id);
            setUpdateColumns(columnsCopy)
        }
        setIntegrationMode(!integrationMode)
        setShow(false)
    }
    const showLayer = () => {
        if (alphabetizing) {
            return
        }
        setShow(true)
        setClickedButton(false)
    }

    return (
        <div className='switch-mode'>
            <div
                onClick={showLayer}
                className={integrationMode ? 'selected-project-navlink' : 'project-navlink'}
                style={
                    {
                        textDecoration: 'none'
                    }}>
                Trello Integration Demo
            </div>
            {(show && !integrationMode) &&
                <Layer
                    onEsc={() => setShow(false)}
                    onClickOutside={() => {
                        setClickedButton(false)
                        setShow(false)
                    }}>

                    <div className='popup-container'>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='popup-text'>This will open a project that is integrated with the Trello Developer API. Changes you make will be reflected on <a href="https://trello.com/b/kxGtyCNW/taskflow" target="_blank" rel="noopener noreferrer">this board</a>.</div>

                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={switchModeClick}>Switch</div>
                        </div>
                    </div>
                    {/* {integrationMode &&
                        <div className='popup-container'>
                            <div className='popup-text'>Switch back to normal mode?</div>
                            <div className={clickedButton ? 'popup-button-clicked' : 'popup-button'} onClick={switchModeClick}>Yes</div>
                        </div>} */}

                </Layer>}
        </div>
    )
}

export default SwitchMode