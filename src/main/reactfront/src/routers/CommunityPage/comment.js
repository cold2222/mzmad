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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/community/comments/${community_pk}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [comments, community_pk]);

    function commentInsert() {
        const community_comment_community_pk = community_pk;
        const community_comment_user_pk = sessionStorage.getItem('userId');
        const community_comment_content = comment;

        if (community_comment_content.length >= 200) {
            alert("댓글은 200자를 넘을 수 없습니다.");
            return; // 함수 종료
        }
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
            <h2>코멘트란</h2>
            <textarea className={styles['comment-textarea']} value={comment} onChange={handleCommentChange}></textarea>
            <button className={styles['comment-button']} onClick={commentInsert}>등록</button>
            {comments.length > 0 && (
                <ul className={styles.commentList}>
                    {comments.map(comment => (
                        <li key={comment.community_comment_pk} className={styles.commentItem}>
                            <p className={styles.commentContent}>{comment.community_comment_content}</p>
                            <p className={styles.commentInfo}>
                                <span className={styles.commentAuthor}>작성자: {comment.userDTO.user_nickname}</span>
                                <span className={styles.commentDate}>작성일: {comment.community_comment_date}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Comment;