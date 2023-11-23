import React from 'react';
import './LeftMenu.css';
import Button from '../Button/Button';

const LeftMenu = () => {
  return (
    <div className="left-menu">
        <Button text="HomeHomeHomeH omeHomeHomeHomeHome HomeHomeHome HomeHomeHomeHome" onClick={() => console.log('Clicked!')} />
        <Button text="About" onClick={() => console.log('Clicked!')} />
        <Button text="Contact" onClick={() => console.log('Clicked!')} />
    </div>
  );
};

export default LeftMenu;
