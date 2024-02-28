import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './css/DetailCourse.module.css';

const DetailCoursePage = () => {
  const { number } = useParams();
  const [videoInfo, setVideoInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const response = await axios.get(`/get-video-info/${number}`);
        setVideoInfo(response.data);

        const commentsResponse = await axios.get(`/get-comments/${number}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('동영상댓글 정보를 가져오는 데 실패했습니다:', error.message);
      }
    };

    fetchVideoInfo();
  }, [number]);

  const handleCommentSubmit = async () => {
    try {

      await axios.post('/submit-comment', {
        course_comment_course_id : number,
        course_comment_user_id : sessionStorage.getItem('userNickname'),
        course_comment_content : newComment,

      });

      const commentsResponse = await axios.get(`/get-comments/${number}`);
      setComments(commentsResponse.data);
      setNewComment('');

      alert("댓글이 등록되었습니다.")
    } catch (error) {
      console.error('댓글을 등록하는 데 실패했습니다:', error.message);
    }
  };

  if (!videoInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title_name}>{videoInfo.courses_name}</h2>
      <video width="80%" height="80%" className={styles.video} controls>
        <source src={`../LectureVideo/${videoInfo.courses_video}`} type="video/mp4" />
      </video>

      <div className={styles.commentSection}>
        <h3>댓글</h3>
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <div key={comment.course_comment_id} className={styles.commentItem}>
              <p>{comment.course_comment_user_id}</p>
              <p>{comment.course_comment_content}</p>
              <p>{comment.course_comment_date}</p>
            </div>
          ))}
        </div>

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
    </div>
  );
};

export default DetailCoursePage;
