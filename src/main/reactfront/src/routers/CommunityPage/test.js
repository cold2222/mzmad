import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from "axios";
import styles from './css/postList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  
  const [currentPage, setCurrentPage] = useState(0);
  const { category } = useParams();

  const [selectedMenu , setSelectedMenu] = useState("");
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/community/selectAll/${category}/${currentPage}`);
      console.log(response.data);
      setPosts(prevPosts => [...prevPosts, ...(response.data)]);
      setCurrentPage(prevPage => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedMenu(category);
    setCurrentPage(0);
    fetchData();

  }, [category]);

  useEffect(() => {
    if(inView){
      fetchData();
    }

  }, [inView]);

  

  return (
    <div className={styles['post-list-container']}>
      <h2>{menu}</h2>
      <ul className={styles['post-list']}>
        {posts.map((post, index) => (
          <li key={post.community_pk}>
            <PostItem post={post} />
            {index === posts.length - 1 && <div ref={ref}></div>}
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
}

const PostItem = ({ post }) => {
  const { category } = useParams();
  return (
    <div className={styles['post-item']}>
      <NavLink to={`/community/${category}/view/${post.community_pk}`} className={styles['post-list-link']}>
        <div className={styles['post-list-textbox']}>
          <div className={styles['post-list-textbox-title']}>
            {post.community_title}
          </div>
          <div className={styles['post-list-textbox-info']}>
            {post.community_date}
            <img src="/img/eye.png" alt="view" width="15" height="15" />{post.community_view}
            <img src="/img/isgood.png" alt="isgood" width="15" height="15" />{post.community_isgood}
          </div>
          <div className={styles['post-list-textbox-content']} dangerouslySetInnerHTML={{ __html: truncateText(post.community_content_only, 140) }}></div>
        </div>
      </NavLink>
    </div>
  );
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export default PostList;