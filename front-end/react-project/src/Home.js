import React from 'react';
import './Home.css';
import Column from './Column';

const columnArray = [0, 1]

const Home = () => {

    return (
        <>
            <div className='sidebar-left'></div>
            <div className='working-area'>{columnArray.map(column => <Column></Column>)}</div>
            <div className='sidebar-right'></div>
        </>
    )

}

export default Home;