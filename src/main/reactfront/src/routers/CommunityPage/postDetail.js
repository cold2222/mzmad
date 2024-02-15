import React from 'react';
import styles from './css/postDetail.module.css';
const PostDetail = ({ selectedPost }) => {
  return (
    <div className={styles['post-detail-container']}>
      <div className={styles['post-detail-contents']}>
        <input name="title" id="title" value={selectedPost.title} type="text" />
        <input name="title" className={styles.title} value={selectedPost.category} type="text" />
        <div className={styles['post-detail-content']} dangerouslySetInnerHTML={{ __html: selectedPost.content }}/>
      </div>
    </div>
  );
}

export default PostDetail;