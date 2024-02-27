import React, { useState, useEffect } from 'react';
import styles from './css/comment.module.css';
import axios from "axios";

const Comment = (community_pk) => {
    const [comment, setComment] = useState("");

    const user_pk = sessionStorage.getItem('user_pk');

    function handleCommentChange(event) {
        setComment(event.target.value);
    }

    function commentInsert() {
        console.log("Inserted comment:", comment);
        axios.post('http://localhost:8080/community/insertComment', {
            community_comment_communty_pk: community_pk,
            community_comment_user_pk : user_pk,
            community_comment_content : comment
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
        <textarea className={styles['comment-textarea']} defaultValue={comment} onChange={handleCommentChange}></textarea>
        <button className={styles['comment-button']} onClick={commentInsert}>등록</button>
    </div>
);
}

export default Comment;