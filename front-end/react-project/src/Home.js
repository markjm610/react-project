import React from 'react';
import './Home.css';
import NavBar from './NavBar';
import ProjectArea from './ProjectArea';
import { Route } from 'react-router-dom';

const projectArr = [1, 2, 3]

const Home = () => {

    return (
        <>
            <div className='sidebar-left'>
                <NavBar projectArr={projectArr}></NavBar>
            </div>
            <div className='working-area'>
                <ProjectArea projectArr={projectArr}></ProjectArea>
            </div>
            <div className='sidebar-right'></div>
        </>
    )

}

export default Home;