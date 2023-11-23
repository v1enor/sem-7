import LeftMenu from '../LeftMenu/LeftMenu';
import MainContainer from '../MainContainer/MainContainer';
import React from 'react';
import './global.css';
import './MainPage.css';

const MainPage = () => {

  const events = [
      { start: 3, end: 4, description: 'Event 1' },
      // Add more events as needed
  ];

  return (
    <>
    <div className='MainPage'>
      <LeftMenu />
      <MainContainer events={events}/>
    </div>
    </>
  );
}

export default MainPage;
