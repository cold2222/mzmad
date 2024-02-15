import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './css/postList.module.css';

const PostList = ({ selectedMenu, onPostClick }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버 요청 수행
    axios.get('http://localhost:8080/community/selectAll')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
    }, []);
    console.log(posts);
  
  if(loading){
    return <div>Loading...</div>;
  }
  return (
    <div className={styles['post-list-container']}>
      <h2>{`${selectedMenu}`}</h2>
      <ul className={styles['post-list']}>
        {posts.map(post => (
          <li key={post.title}>
            <div onClick={() => onPostClick(post)}>
              {post.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;