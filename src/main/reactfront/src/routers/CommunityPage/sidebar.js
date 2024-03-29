import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './css/sidebar.module.css';

const Sidebar = ({ onBackToList }) => {
  
  
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
              })}>
              #Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/free"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}>
              #자유게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/tip"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}>
              #글쓰기 Tip 공유게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/assignment"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}>
              #과제게시판
            </NavLink>
          </li>
          <li>
            <NavLink to="/community/portfolio"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={({ isActive }) => ({
                color: isActive ? '#ffd700' : 'white',
              })}>
              #포트폴리오
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;