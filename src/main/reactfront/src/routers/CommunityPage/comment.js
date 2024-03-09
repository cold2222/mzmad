import React, { useState, useEffect } from 'react';
import styles from './css/comment.module.css';
import axios from "axios";
import CommentDetail from './commentDetail';

const Comment = (props) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentUpdate, setCommentUpdate] = useState(false);
    const { community_pk } = props;
    console.log(comments);
    console.log("코멘트요");
    function loginCheck() {
        if (sessionStorage.getItem('userId') != null) {
          return false;
        }
        return true;
      }

    function handleCommentUpdate(){
        setCommentUpdate(!commentUpdate);
    }

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    useEffect(() => {
        console.log("코멘트 재요청")
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/community/comments/${community_pk}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [commentUpdate]);

    function commentInsert() {
        if(loginCheck()){
            alert("로그인후 이용 가능합니다");
            return;
        }
        const community_comment_community_pk = community_pk;
        const community_comment_user_pk = sessionStorage.getItem('userId');
        const community_comment_content = comment;

        if (community_comment_content.length >= 200) {
            alert("댓글은 200자를 넘을 수 없습니다.");
            return;
        }
        axios.post('http://localhost:8080/community/insertComment', {
            community_comment_community_pk,
            community_comment_user_pk,
            community_comment_content,
        })
            .then(response => {
                console.log('댓글추가 성공:', response.data);
                setComment("");
                handleCommentUpdate();
            })
            .catch(error => {
                console.error('데이터 업데이트 실패:', error);
            });

    }
    return (
        <div className={styles['comment-container']}>
            <h2>코멘트란</h2>
            <textarea className={styles['comment-textarea']} value={comment} onChange={handleCommentChange}></textarea>
            <button className={styles['comment-button']} onClick={commentInsert}>등록</button>
            <CommentDetail comments={comments} handleCommentUpdate={handleCommentUpdate} />
        </div>
    );
}

export default Comment;