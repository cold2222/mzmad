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

  const moveLogin = () => {
    navigate('/login');
  };

  return (
    <header className="header-container">
        <div onClick={moveHome}>Home</div>
        <div onClick={moveCommunity}>Community</div>
        <div onClick={moveLogin}>Login</div>
    </header>
  );
}

export default Header;