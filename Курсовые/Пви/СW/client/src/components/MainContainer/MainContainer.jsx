import React from 'react';
import TopMenu from '../TopMenu/TopMenu';
import './MainContainer.css';
// import Calendar from '../Calendar/Calendar';
import Day from '../Day/Day';

const MainContainer = () => {
    return (
        <div className='mainContainer'>
            <TopMenu />
            <Day  />
        </div>
    );
};

export default MainContainer;
