import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import styles from './css/postList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { category } = useParams();
  let menu = "";
  if (category === "home") {
    menu = "#home";
  } else if (category === "free") {
    menu = "#자유게시판";
  } else if (category === "tip") {
    menu = "글쓰기 Tip 공유게시판";
  } else if (category === "assignment") {
    menu = "#과제게시판"
  }


  useEffect(() => {
    console.log(category)
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/community/selectAll/${category}`);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['post-list-container']}>
      <h2>{menu}</h2>
      <ul className={styles['post-list']}>
        {posts.map(post => (
          <li key={post.community_pk}>
            <div>
              <NavLink className={styles['post-list-link']} to={'/community/' + category + '/view/' + post.community_pk}>
                <div className={styles['post-list-textbox']}>
                  <div className={styles['post-list-textbox-title']}>
                    {post.community_title}
                  </div>
                  <div className={styles['post-list-textbox-info']}>
                    <img src="/img/eye.png" alt="view" width="15" height="15"/>{post.community_view}
                    
                    <img src="/img/isgood.png" alt="isgood" width="15" height="15"/>{post.community_isgood}</div>
                    {post.userDTO.nickname}
                </div>
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;