import React, { useState } from 'react';
import PostList from './postList';
import PostDetail from './postDetail';
import Sidebar from './sidebar';
import './css/communityPage.css';

const CommunityPage = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostList, setShowPostList] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState('#Home'); // 선택한 메뉴 상태

    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
        handleBackToList();
    }
        const handlePostClick = (postId) => {
            setSelectedPost(postId);
            setShowPostList(false);
        };

        const handleBackToList = () => {
            setSelectedPost(null);
            setShowPostList(true);
        };

        return (
            <div className="community-container">
                <div className="community-head-div">
                    <h2 className="community-head">커뮤니티 페이지</h2>
                </div>
                <div className="community-content">
                    <Sidebar onSelectMenu={handleMenuChange}/>
                    <div className='community-contentBox'>
                        {showPostList ? (
                            <PostList onPostClick={handlePostClick} selectedMenu={selectedMenu}/>
                        ) : (
                            <div className='community-details'>
                                <button className='button' onClick={handleBackToList}>목록으로 돌아가기</button>
                                {selectedPost && <PostDetail postId={selectedPost} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    export default CommunityPage;