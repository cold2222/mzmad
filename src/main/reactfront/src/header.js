import React, { useState } from 'react';
import styles from './css/header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const [showMenu, setShowMenu] = useState(false);

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
    setShowMenu(false); // Close menu when navigating
    if (userId) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu); // 이전 상태를 가져와서 반전시킴
    console.log("Menu is now", !showMenu ? "visible" : "hidden"); // 이전 상태를 기준으로 로그 출력
  };

  return (
    <header className={styles['header-container']}>
      <div onClick={moveHome}>Home</div>
      <div onClick={moveCourse}>Course</div>
      <div onClick={moveCommunity}>Community</div>
      <div className={styles['hamburger-menu-wrapper']}>
        <div className={styles['hamburger-menu']} onClick={toggleMenu}>☰</div>
        {showMenu && (
          <div className={styles['menu']}>
            {userId ? <div onClick={moveLogin}>Mypage</div> : <div onClick={moveLogin}>Login</div>}
            <div onClick={() => navigate('/dashboard')}>Dashboard</div>
            <div onClick={() => navigate('/mycourse')}>Mycourse</div>
            {userId && <div onClick={() => { 
              sessionStorage.removeItem('userId'); 
              sessionStorage.removeItem('userEmail');
              sessionStorage.removeItem('userNickname');
              sessionStorage.removeItem('platform');
              sessionStorage.removeItem('isAdmin');
              sessionStorage.removeItem('coursesKey');
              sessionStorage.removeItem('profile');
              navigate('/'); 
            }}>Logout</div>}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;