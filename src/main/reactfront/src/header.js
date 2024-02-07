import React from 'react';
import './css/header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/home');
  };
  const moveCommunity = () => {
    navigate('/community');
  };

  return (
    <header className="header-container">
        <div onClick={moveHome}>Home</div>
        <div onClick={moveCommunity}>community</div>
    </header>
  );
}

export default Header;