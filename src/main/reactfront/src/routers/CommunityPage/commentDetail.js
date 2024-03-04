import React from 'react';
import styles from './css/commentDetail.module.css';
import ReCommentDetail from './reCommentDetail';

const CommentDetail = ({ comments }) => {
    return (
        <div>
            {comments.length > 0 && (
                <ul className={styles.commentList}>
                    {comments.map(comment => (
                        <li key={comment.community_comment_pk} className={styles.commentItem}>
                            <p className={styles.commentContent}>{comment.community_comment_content}</p>
                            <p className={styles.commentInfo}>
                                <span className={styles.commentAuthor}>작성자: {comment.userDTO.user_nickname}</span>
                                <span className={styles.commentDate}>작성일: {comment.community_comment_date}</span>
                            </p>
                            <div className={styles.commentContentButton}>
                                <p>
                                    <button>수정</button>
                                    <button>삭제</button>
                                    <button>리댓글</button>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CommentDetail;