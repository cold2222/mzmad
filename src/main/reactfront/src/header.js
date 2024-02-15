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
  const moveCourse = () => {
    navigate('/course');
  };

  const moveLogin = () => {
    navigate('/login');
  };

  return (
    <header className={styles['header-container']}>
        <div onClick={moveHome}>Home</div>
        <div onClick={moveLogin}>Login</div>
        <div onClick={moveCourse}>course</div>
        <div onClick={moveCommunity}>community</div>
    </header>
  );
}

export default Header;