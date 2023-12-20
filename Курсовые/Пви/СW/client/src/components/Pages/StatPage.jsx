import LeftMenu from '../LeftMenu/LeftMenu';
import StatContainer from '../StatContent/StatContent';
import React from 'react';
import './styles/MainPage.css';

const StatPage = () => {

  return (
    <>
      <div className='MainPage'>
        <LeftMenu />
        <StatContainer />
      </div>
    </>
  );
}

export default StatPage;
