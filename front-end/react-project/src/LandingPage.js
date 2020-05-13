import React from 'react';
import './LandingPage.css';
import LogInAndSignUp from './LogInAndSignUp';
// import background from './images/background.jpg'

const LandingPage = () => {
    return (
        <div className='landing-page'>
            {/* <img className='background-image' src={background}></img> */}
            <LogInAndSignUp className='log-in-and-sign-up'></LogInAndSignUp>
        </div>
    )
}



export default LandingPage;