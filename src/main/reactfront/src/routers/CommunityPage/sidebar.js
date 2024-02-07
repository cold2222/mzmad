import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/community/home" onClick={() => { onSelectMenu('#Home'); }}>
            #Home
          </Link>
        </li>
        <li>
          <Link to="/community/free" onClick={() => { onSelectMenu('#자유게시판'); }}>
            #자유게시판
          </Link>
        </li>
        <li>
          <Link to="/community/tip" onClick={() => { onSelectMenu('#글쓰기Tip공유게시판'); }}>
            #글쓰기 Tip 공유게시판
          </Link>
        </li>
        <li>
          <Link to="/community/assignment" onClick={() => { onSelectMenu('#과제게시판'); }}>
            #과제게시판
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;