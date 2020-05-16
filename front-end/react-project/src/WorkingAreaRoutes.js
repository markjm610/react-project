import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import WorkingArea from './WorkingArea';
import Context from './Context';




const WorkingAreaRoutes = ({ isOver }) => {

    const { projectArr } = useContext(Context);



    return projectArr.map(({ id }, i) => {
        return (
            <Route key={i}
                exact
                path={`/home/project/${id}`}
                render={() => <WorkingArea key={i} projectId={id} isOver={isOver} />}>
            </Route>)
    })
}

export default WorkingAreaRoutes;

