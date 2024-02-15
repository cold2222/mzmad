import React from 'react';
import './css/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };
  const moveCommunity = () => {
    navigate('/community');
  };
  const moveCourse = () => {
    navigate('/course');
  };

  return (
    <header className="header-container">
        <div onClick={moveHome}>Home</div>
        <div onClick={moveCourse}>course</div>
        <div onClick={moveCommunity}>community</div>
    </header>
  );
}

export default Header;