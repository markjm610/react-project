import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import WorkingArea from './WorkingArea';
import Context from './Context';

const WorkingAreaRoutes = () => {

    const { projectArr } = useContext(Context);

    return projectArr.map(({ id }, i) => {
        return (
            <Route key={i}
                exact
                path={`/home/project/${id}`}
                render={() => <WorkingArea key={i} projectId={id} />}>
            </Route>)
    })
}

export default WorkingAreaRoutes;

