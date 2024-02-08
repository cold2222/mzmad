import React from 'react';
import { NavLink  } from 'react-router-dom';
import './css/sidebar.css';

const Sidebar = ({ onSelectMenu, onBackToList }) => {
  return (
    <div className="sidebar-container">
      <div className='user-info'>
        <img src='./img/bbsicon.jpg' alt='profile' />
        <h2>user name</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <NavLink  to="/community" activeClassName="active" onClick={() => { onSelectMenu('#Home'); }}>
            #Home
          </NavLink>
        </li>
        <li>
          <NavLink  to="/community/free" activeClassName="active" onClick={() => { onSelectMenu('#자유게시판'); }}>
            #자유게시판
          </NavLink>
        </li>
        <li>
          <NavLink  to="/community/tip" activeClassName="active" onClick={() => { onSelectMenu('#글쓰기Tip공유게시판'); }}>
            #글쓰기 Tip 공유게시판
          </NavLink>
        </li>
        <li>
          <NavLink  to="/community/assignment" activeClassName="active" onClick={() => { onSelectMenu('#과제게시판'); }}>
            #과제게시판
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;