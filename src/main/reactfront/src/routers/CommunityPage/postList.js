import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import styles from './css/postList.module.css';
import { useInView } from 'react-intersection-observer';

const PostList = ({ posts, loading, category ,selectedMenu, handleInView}) => {
  const [ref, inView] = useInView();
  
  useEffect(() => {
    handleInView(inView)
}, [inView]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}
  
  return (
    <div className={styles['post-list-container']}>
      <h2>{selectedMenu}</h2>
      <ul className={styles['post-list']}>
        {posts.map((post, key) => (
          <li key={key}>
            <div>
              <NavLink className={styles['post-list-link']} to={'/community/' + category + '/view/' + post.community_pk}>
                <div className={styles['post-list-textbox']}>
                  <div className={styles['post-list-textbox-title']}>
                    {post.community_title}
                  </div>
                </div>
                <div className={styles['post-list-textbox-info']}>
                  <div>{post.community_date}</div>
                  <div>
                    <img src="/img/eye.png" alt="view" width="15" height="15" />{post.community_view}
                    <img src="/img/isgood.png" alt="isgood" width="15" height="15" />{post.community_isgood}
                  </div>
                  <div>{post.community_category}</div>
                  <div>{post.userDTO.user_nickname}</div>
                </div>
                <div className={styles['post-list-textbox-content']} dangerouslySetInnerHTML={{
                  __html: posts && posts != null ? truncateText(post.community_content_only, 140) : ''
                }}>
                </div>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
      {loading ? <div>Loading...</div> : <div ref={ref}></div>}
    </div>
  );
}

export default PostList;