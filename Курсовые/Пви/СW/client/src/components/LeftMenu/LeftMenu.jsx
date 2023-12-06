import React from 'react';
import './LeftMenu.css';
import Button from '../Button/Button';

const handleLogout = () => {
  localStorage.removeItem('authToken');
   window.location.href = "/signin";
};


const LeftMenu = () => {
  return (
    <div className="left-menu">
        <a href='/'>  <Button text="Главная" /> </a>
        <a href='/signin'> <Button text="Вход" /> </a>
        <Button text="Выход" onClick={handleLogout} />
    </div>
  );
};

export default LeftMenu;
