import React from 'react';
import './Home.css';
import NavBar from './NavBar';
import WorkingArea from './WorkingArea';
import { Route } from 'react-router-dom';

const projectArr = [1, 2, 3]

const Home = () => {

    return (
        <>
            <div className='sidebar-left'>
                <NavBar projectArr={projectArr}></NavBar>
            </div>
            <div className='working-area'>
                <Route exact path='/home/project/1' component={WorkingArea}></Route>
            </div>
            <div className='sidebar-right'></div>
        </>
    )

}

export default Home;