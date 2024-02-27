import React, { useEffect, useState } from "react";
import Comment from './comment';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/postDetail.module.css';
import axios from "axios";

const PostDetail = () => {
  const [isgood, setIsgood] = useState(0);
  const [report, setReport] = useState(0);

  const [post, setPost] = useState([]);

  const { community_pk } = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1); // 이전 페이지로 이동
  }

  function isGood() {
    if (window.confirm('좋아요를 주겠습니까?')) {
      let community_pk = post.community_pk
      axios.put('http://localhost:8080/community/isgood', community_pk)
        .then(response => {
          console.log('데이터 업데이트 성공:', response.data);
          setIsgood(parseInt(isgood) + 1);
        })
        .catch(error => {
          console.error('데이터 업데이트 실패:', error);
        });
    }
  }
  function communityReport() {
    if (window.confirm('신고하시겠습니다?')) {
      let community_pk = post.community_pk
      axios.put('http://localhost:8080/community/report', community_pk)
        .then(response => {
          console.log('데이터 업데이트 성공:', response.data);
          setReport(parseInt(report) + 1)
          alert('신고 완료');
        })
        .catch(error => {
          console.error('데이터 업데이트 실패:', error);
        });
    }
  }
  function communityDelect() {
    if (window.confirm('삭제하시겠습니까?')) {
      let community_pk = post.community_pk
      axios.delete('http://localhost:8080/community/delete', { data: community_pk })
        .then(response => {
          console.log('게시글 삭제 성공:', response.data);
          alert('삭제 완료');
          window.location.href = "http://localhost:3000/community/home";
        })
        .catch(error => {
          console.error('데이터 업데이트 실패:', error);
        });
    }
  }
  function communityUpdate() {
    if (window.confirm('수정하시겠습니까?')) {
      navigate(`/community/update/${post.community_pk}`);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/community/view/${community_pk}`);
        setPost(response.data);
        setIsgood(response.data.community_isgood)
        setReport(response.data.community_report)
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [community_pk]);

  return (
    <div>
      <div className={styles['post-detail-head']}>
        <div className={styles['button']} onClick={communityReport}>신고하기
          <div dangerouslySetInnerHTML={{ __html: report }}></div>
        </div>
      </div>
      <div className={styles['post-detail-contents']}>
        <div name="title" id="title" dangerouslySetInnerHTML={{ __html: post.community_title }} className={styles.titleinput} ></div>
        {post.userDTO && <div dangerouslySetInnerHTML={{ __html: post.userDTO.user_nickName }} className={styles.userinput}></div>}
        <div className={styles['post-detail-contents-head']} >
          <div className={styles['post-detail-contents-head-1']}>
            <div className={styles['post-list-textbox-info']}>
              <div name="category" id="category" dangerouslySetInnerHTML={{ __html: post.community_category }} className={styles.input} ></div>
              <img src="/img/eye.png" alt="view" width="15" height="15" />
              {post.community_view}
              <img className={styles['post-list-textbox-isgood']} onClick={isGood} src="/img/isgood.png" alt="isgood" width="15" height="15" />
              {isgood}
            </div>
            <div className={styles['post-list-textbox-date']} dangerouslySetInnerHTML={{ __html: post.community_date }}></div>
          </div>
        </div>
        <hr />
        <div className={styles['post-detail-content']} dangerouslySetInnerHTML={{ __html: post.community_content }} />
      </div>
      <div className={styles['button']} onClick={handleGoBack}>돌아가기</div>
      <div className={styles['button']} onClick={communityDelect}>삭제</div>
      <div className={styles['button']} onClick={communityUpdate}>수정</div>
      <Comment communty_pk={post.communty_pk}/>
    </div>
  );
}

export default PostDetail;