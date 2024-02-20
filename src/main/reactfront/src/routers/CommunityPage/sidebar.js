import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/sidebar.module.css';

const Sidebar = ({ onSelectMenu, onBackToList }) => {
  return (
    <div className={styles['sidebar-container']}>
      <div className={styles['sidebar-container-box']}>
        <div className={styles['user-info']}>
          <img src='/img/bbsicon.jpg' alt='profile' />
          <h2 className={styles['write-page']}>
            <NavLink to="/community/write" >
              #글쓰기
            </NavLink>
          </h2>
        </div>
        <ul className={styles['sidebar-links']}>
          <li>
            <NavLink to="/community/home"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}
              onClick={() => { onSelectMenu('#home'); }}>
              #Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/free"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}
              onClick={() => { onSelectMenu('#자유게시판'); }}>
              #자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/tip"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}
              onClick={() => { onSelectMenu('#글쓰기Tip공유게시판'); }}>
              #글쓰기 Tip 공유게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/assignment"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}
              onClick={() => { onSelectMenu('#과제게시판'); }}>
              #과제게시판
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;