import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from 'react-router-dom';
import styles from './css/postDetail.module.css';
import axios from "axios";

const PostDetail = () => {
  const [post, setPost] = useState([]);

  const { community_pk } = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1); // 이전 페이지로 이동
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/community/view/${community_pk}`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [community_pk]);

  return (
    <div>
    <div className={styles['post-detail-contents']}>
      <div name="title" id="title" dangerouslySetInnerHTML={{ __html: post.community_title }} className={styles.titleinput} ></div>
      <div name="category" id="category" dangerouslySetInnerHTML={{ __html: post.community_category }} className={styles.input} ></div>
      <hr />
      <div className={styles['post-detail-content']} dangerouslySetInnerHTML={{ __html: post.community_content }}/>
    </div>
    <div className={styles['button']} onClick={handleGoBack}>돌아가기</div>
    </div>
  );
}

export default PostDetail;