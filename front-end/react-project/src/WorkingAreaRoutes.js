import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import WorkingArea from './WorkingArea';
import Context from './Context';




const WorkingAreaRoutes = ({ isOver }) => {

    const { projectArr } = useContext(Context);



    return projectArr.map(({ id }, i) => {
        return (
            <Route key={id}
                exact
                path={`/home/project/${id}`}
                render={() => <WorkingArea key={id} projectId={id} isOver={isOver} />}>
            </Route>)
    })
}

export default WorkingAreaRoutes;

