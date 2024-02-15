import React from 'react';
import styles from './css/header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate('/');
  };
  const moveCommunity = () => {
    navigate('/community/home');
  };

  return (
    <header className={styles['header-container']}>
        <div onClick={moveHome}>Home</div>
        <div onClick={moveCommunity}>Community</div>
    </header>
  );
}

export default Header;