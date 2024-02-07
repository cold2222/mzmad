import React from 'react';
import './css/postList.css';

const PostList = ({ selectedMenu, onPostClick }) => {
  const posts = [
    { id: 1, title: '첫 번째 포스트' },
    { id: 2, title: '두 번째 포스트' },
    { id: 3, title: '세 번째 포스트' },
  ];

  return (
    <div className="post-list-container">
      <h2>{`${selectedMenu}`}</h2>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} onClick={() => onPostClick(post.id)}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;