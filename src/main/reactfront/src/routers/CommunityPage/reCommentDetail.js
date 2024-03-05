import React from 'react';
import styles from './css/comment.module.css';

const ReCommentDetail = (props) => {
  const { comment } = props;
  
  return (
    <div>
    
                {/* <ul className={styles.commentList}>
                    {comment.map(reComment => (
                        <li key={reComment.community_comment_pk} className={styles.commentItem}>
                            <p className={styles.commentContent}>{reComment.community_comment_content}</p>
                            <p className={styles.commentInfo}>
                                <span className={styles.commentAuthor}>작성자: {reComment.userDTO.user_nickname}</span>
                                <span className={styles.commentDate}>작성일: {reComment.community_comment_date}</span>
                            </p>
                        </li>
                    ))}
                </ul>
         */}
    </div>
  );
}

export default ReCommentDetail;