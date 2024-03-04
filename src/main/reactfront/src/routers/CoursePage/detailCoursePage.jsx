import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './css/DetailCourse.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailCoursePage = () => {
  const { number } = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replyComment, setReplyComment] = useState('');
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await axios.get(`/get-video-info/${number}`);
        setVideoInfo(response.data);

        const commentsResponse = await axios.get(`/get-comments/${number}`);
        setComments(commentsResponse.data);

        
        const repliesData = {};
        await Promise.all(
          commentsResponse.data.map(async (comment) => {
            const repliesResponse = await axios.get(`/get-replies/${comment.course_comment_id}`);
            repliesData[comment.course_comment_id] = repliesResponse.data;
          })
        );
        setReplies(repliesData);
      } catch (error) {
        console.error('동영상댓글 정보를 가져오는 데 실패했습니다:', error.message);
      }
    };

    fetchVideoInfo();
  }, [number]);

  const handleCommentSubmit = async () => {
    if(sessionStorage.getItem('userNickname')===null){
      toast("로그인을 해주세요.");
      
    }
    else{
      try {

        // 댓글 등록
        await axios.post('/submit-comment', {
          course_comment_course_id: number,
          course_comment_user_id: sessionStorage.getItem('userNickname'),
          course_comment_content: newComment,
        });
    
        // 댓글 목록 가져오기
        const commentsResponse = await axios.get(`/get-comments/${number}`);
        setComments(commentsResponse.data);
        setNewComment('');
    
        toast("댓글이 등록되었습니다.");
      } catch (error) {
        console.error('댓글을 등록하는 데 실패했습니다:', error.message);
      }
    }
  };
  
  const handleReplySubmit = async () => {
    if(sessionStorage.getItem('userNickname')===null){
      toast("로그인을 해주세요.");
      
    }
    else{
      try {
        // 리댓글 등록
        await axios.post('/submit-reply', {
          course_recomment_comment_id : replyCommentId,
          course_recomment_user_id : sessionStorage.getItem('userNickname'),
          course_recomment_content : replyComment,
        });
    
        // 리댓글 목록 가져오기
        const repliesResponse = await axios.get(`/get-replies/${replyCommentId}`);
        setReplies((prevReplies) => ({ ...prevReplies, [replyCommentId]: repliesResponse.data }));
    
        setReplyComment('');
        setReplyCommentId(null);
    
        toast("Re:댓글이 등록되었습니다.");
      } catch (error) {
        console.error('리댓글을 제출하는 데 실패했습니다:', error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      {videoInfo && (
        <div className={styles.container}>
          <h2 className={styles.title_name}>{videoInfo.courses_name}</h2>
          <video width="80%" height="80%" className={styles.video} controls>
            <source src={`../LectureVideo/${videoInfo.courses_video}`} type="video/mp4" />
          </video>
        </div>
      )}

      <div className={styles.commentSection}>
        <h3>댓글</h3>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.course_comment_id} className={styles.commentItem}>
              <p>{comment.course_comment_user_id}</p>
              <p>{comment.course_comment_content}</p>
              <p>{comment.course_comment_date}</p>
              <button onClick={() => setReplyCommentId(comment.course_comment_id)}>리댓글 달기</button>

              {/* Replies Rendering */}
              {replies[comment.course_comment_id] && (
                <div className={styles.repliesList}>
                  {replies[comment.course_comment_id].map((reply) => (
                    <div key={reply.course_recomment_id} className={styles.replyItem}>
                      <p>{reply.course_recomment_user_id}</p>
                      <p>{reply.course_recomment_content}</p>
                      <p>{reply.course_recomment_date}</p>
                    </div>
                  ))}
                </div>
              )}


              {/* Reply Form */}
              {replyCommentId === comment.course_comment_id && (
                <div className={styles.replyForm}>
                  <textarea
                    className={styles.commentInput} // 사용자 정의 CSS 클래스 사용
                    value={replyComment}
                    onChange={(e) => setReplyComment(e.target.value)}
                    placeholder="Re:댓글을 입력하세요..."
                  />
                  <button className={styles.commentButton} onClick={handleReplySubmit}>
                    리댓글 등록
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <div className={styles.commentForm}>
          <textarea
            className={styles.commentInput}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
          />
          <button className={styles.commentButton} onClick={handleCommentSubmit}>
            댓글 등록
          </button>
        </div>
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
};

export default DetailCoursePage;
