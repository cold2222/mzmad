import React from 'react';
import './css/postDetail.css';

const PostDetail = ({ postId }) => {
  const post = { id: postId, title: `포스트 ${postId}`, content: '포스트 내용입니다.나중에 여기다가 db값 넣어야됨' };

  return (
    <div className="post-detail-container">
      <div className='post-detail-content'>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default PostDetail;