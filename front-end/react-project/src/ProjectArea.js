import React from 'react';
import { Route } from 'react-router-dom';
import WorkingArea from './WorkingArea';

const ProjectArea = ({ projectArr }) => {
    // console.log(projectArr)
    return projectArr.map(projectId => {
        // console.log(projectId)
        return (
            <Route
                exact
                path={`/home/project/${projectId}`}
                render={() => <WorkingArea projectId={projectId}></WorkingArea>}>
            </Route>)
    })
}

export default ProjectArea;

