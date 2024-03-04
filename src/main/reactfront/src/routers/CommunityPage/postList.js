import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import styles from './css/postList.module.css';
import { useInView } from 'react-intersection-observer';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const totalPageCount = useRef(0);
  const page = useRef(0);
  
  const { category } = useParams();
  const [menu, setMenu] = useState(category);


  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/community/selectAll/${category}/${page.current}`);
      if (page.current === 0) {
        setPosts(response.data.communityList);
        page.current += 1;
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data.communityList]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("category이펙트안 작동");

    const getTotalCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/community/getTotalCount/${category}`);
        totalPageCount.current = response.data.totalPageCount;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getTotalCount();

    page.current = 0;
    setPosts([])

    if (category === "home") {
      setMenu("#home");
    } else if (category === "free") {
      setMenu("#자유게시판");
    } else if (category === "tip") {
      setMenu("글쓰기 Tip 공유게시판");
    } else if (category === "assignment") {
      setMenu("#과제게시판");
    }
    fetchData();

  }, [category]);

  useEffect(() => {
    if (inView && posts.length < totalPageCount.current) {
      console.log(inView, '무한 스크롤 요청')
      fetchData();
      page.current += 1;
    }
  }, [inView, totalPageCount.current]);


  if (loading && posts.length === 0) {
    return <div>
      Loading...
    </div>;
  }

  return (
    <div className={styles['post-list-container']}>
      <h2>{menu}</h2>
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
                  {post.community_date}
                  <img src="/img/eye.png" alt="view" width="15" height="15" />{post.community_view}
                  <img src="/img/isgood.png" alt="isgood" width="15" height="15" />{post.community_isgood}
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
      {loading? <div>Loading...</div> : <div ref={ref}></div>}
    </div>
  );
}

export default PostList;