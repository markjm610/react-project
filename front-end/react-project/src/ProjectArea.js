import React from 'react';
import { Route } from 'react-router-dom';
import WorkingArea from './WorkingArea';

const ProjectArea = ({ projectArr }) => {
    return projectArr.map((projectId, i) => {
        return (
            <Route key={i}
                exact
                path={`/home/project/${projectId}`}
                render={() => <WorkingArea key={i} projectId={projectId}></WorkingArea>}>
            </Route>)
    })
}

export default ProjectArea;

