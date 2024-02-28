import React, { useState, useEffect } from 'react';
import styles from './css/comment.module.css';
import axios from "axios";

const Comment = (props) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const { community_pk } = props;
    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function commentInsert() {
        const community_comment_community_pk = community_pk;
        const community_comment_user_pk = sessionStorage.getItem('userId');
        const community_comment_content = comment;
        axios.post('http://localhost:8080/community/insertComment', {
            community_comment_community_pk,
            community_comment_user_pk,
            community_comment_content,
        })
        .then(response => {
            console.log('댓글추가 성공:', response.data);
            setComment("");
        })
    .catch(error => {
        console.error('데이터 업데이트 실패:', error);
    });

    }

return (
    <div className={styles['comment-container']}>
        <textarea className={styles['comment-textarea']} value={comment} onChange={handleCommentChange}></textarea>
        <button className={styles['comment-button']} onClick={commentInsert}>등록</button>
    </div>
);
}

export default Comment;