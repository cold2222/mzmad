import React, { useState } from 'react';
import PostList from './postList';
import PostDetail from './postDetail';
import Sidebar from './sidebar';
import styles from './css/communityPage.module.css';

const CommunityPage = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostList, setShowPostList] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('#Home');

    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
        handleBackToList();
    }

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowPostList(false);
    };

    const handleBackToList = () => {
        setSelectedPost(null);
        setShowPostList(true);
    };

    return (
        <div className={styles['community-container']}>
            <div className={styles['community-head-div']}>
                <h2 className={styles['community-head']}>커뮤니티 페이지</h2>
            </div>
            <div className={styles['community-content']}>
                <Sidebar onSelectMenu={handleMenuChange}/>
                <div className={styles['community-contentBox']}>
                    {showPostList ? (
                        <PostList onPostClick={handlePostClick} selectedMenu={selectedMenu}/>
                    ) : (
                        <div className={styles['community-details']}>
                            {selectedPost.title && <PostDetail selectedPost={selectedPost} />}
                            <button className={styles['button']} onClick={handleBackToList}>목록으로 돌아가기</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;