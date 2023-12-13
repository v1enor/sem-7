import LeftMenu from '../LeftMenu/LeftMenu';
import MainContainer from '../MainContainer/MainContainer';
import React from 'react';
import './styles/global.css';
import './styles/MainPage.css';

const MainPage = () => {

  return (
    <>
      <div className='MainPage'>
        <LeftMenu />
        <MainContainer />
      </div>
    </>
  );
}

export default MainPage;
