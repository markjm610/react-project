import React from 'react';
import { Route } from 'react-router-dom';
import WorkingArea from './WorkingArea';

const WorkingAreaRoutes = ({ projectArr }) => {

    // projectArr comes from fetch request and hook on Home component

    return projectArr.map(({ id }, i) => {
        return (
            <Route key={i}
                exact
                path={`/home/project/${id}`}
                render={() => <WorkingArea key={i} projectId={id}></WorkingArea>}>
            </Route>)
    })
}

export default WorkingAreaRoutes;

