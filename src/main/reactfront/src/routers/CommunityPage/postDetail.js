import React, { useEffect, useState } from "react";
import Comment from './comment';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './css/postDetail.module.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


const PostDetail = ({ handleScrollToTop, handleSaveScrollPos }) => {
  const [isgood, setIsgood] = useState(0);
  const [report, setReport] = useState(0);
  const [post, setPost] = useState([]);
  const[userInfo, setUserInfo] = useState([]);

  const { community_pk } = useParams();
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  function loginCheck() {
    if (sessionStorage.getItem('userId') != null) {
      return false;
    }
    return true;
  }

  async function isGoodCheck() {
    try {
      let community_isgood_community_pk = community_pk;
      let community_isgood_user_pk = sessionStorage.getItem('userId');
      const response = await axios.post('http://localhost:8080/community/isGoodCheck', {
        community_isgood_community_pk,
        community_isgood_user_pk
      });
      console.log('추천여부 확인', response.data);
      return response.data;
    } catch (error) {
      console.error('추천여부 확인 실패:', error);
      return false;
    }
  }

  function isGood() {
    if (loginCheck()) {
      toast.error("로그인 후 이용 가능합니다");
      return;
    }

    isGoodCheck().then((checkResult) => {
      console.log(checkResult);
      if (checkResult === true) {
        toast.error("이미 추천하셨습니다 !");
        return;
      }

      if (window.confirm('좋아요를 주겠습니까?')) {
        let community_pk = post.community_pk;
        axios.put('http://localhost:8080/community/isgood', community_pk)
          .then(response => {
            console.log('데이터 업데이트 성공:', response.data);
            setIsgood(prevIsgood => prevIsgood + 1);
          })
          .catch(error => {
            console.error('데이터 업데이트 실패:', error);
          });
      }
    });
  }

  async function reportCheck() {
    try {
      let community_report_community_pk = community_pk;
      let community_report_user_pk = sessionStorage.getItem('userId');
      const response = await axios.post('http://localhost:8080/community/reportCheck', {
        community_report_community_pk,
        community_report_user_pk
      });
      console.log('추천여부 확인', response.data);
      return response.data;
    } catch (error) {
      console.error('추천여부 확인 실패:', error);
      return false;
    }
  }

  function communityReport() {
    if (loginCheck()) {
      toast.error("로그인 후 이용 가능합니다");
      return;
    }

    reportCheck().then((checkResult) => {
      console.log(checkResult);
      if (checkResult === true) {
        toast.error("이미 신고하셨습니다 !");
        return;
      }
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
    });
  }

  function writerCheck(){
      let userID = sessionStorage.getItem('userId');
      console.log(userID)
      console.log(post.userDTO.user_pk)
    if(userID !== post.userDTO.user_pk){
        return true;
      }
      return false;
  }

  function communityDelect() {
    if(writerCheck()){
      toast.error("권한이 없습니다");
      return ;
    }
    
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
    if(writerCheck()){
      toast.error("권한이 없습니다");
      return ;
    }
    
    if (window.confirm('수정하시겠습니까?')) {
      navigate(`/community/update/${post.community_pk}`);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/community/view/${community_pk}`);
        setPost(response.data);
        setUserInfo(response.data.userDTO)
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
        <div dangerouslySetInnerHTML={{ __html: "작성자 : "+userInfo.user_nickname }} className={styles.userinput}></div>
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
      <div className={styles['post-detail-footer']}>
        <div className={styles['post-detail-footer-button']}>
          <div className={styles['button']} onClick={handleGoBack}>돌아가기</div>
          <div className={styles['button']} onClick={communityDelect}>삭제</div>
          <div className={styles['button']} onClick={communityUpdate}>수정</div>
        </div >
        <Comment community_pk={community_pk} />
      </div>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
}

export default PostDetail;