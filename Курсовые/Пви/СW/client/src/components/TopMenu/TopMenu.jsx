import React from 'react';
import Button from '../Button/Button';
import './TopMenu.css';
const TopMenu = () => {
  return (
    <div className="top-menu">
        <Button text="Home3" onClick={() => console.log('Clicked!')} />
        <Button text="Home" onClick={() => console.log('Clicked!')} />
        <Button text="Home" onClick={() => console.log('Clicked!')} />
    </div>
  );
};

export default TopMenu;
