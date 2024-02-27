import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './postList';
import PostDetail from './postDetail';
import EditorUpdate from '../Editor/EditorUpdate';
import Sidebar from './sidebar';
import styles from './css/communityPage.module.css';

const CommunityPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("#home");

    const handleMenuChange = (menu) => {
        setSelectedMenu(menu);
    }

    return (
        <div className={styles['community-container']}>
            <div className={styles['community-head-div']}>
                <h2 className={styles['community-head']}>커뮤니티 페이지</h2>
            </div>
            <div className={styles['community-content']}>
                <Sidebar onSelectMenu={handleMenuChange} />
                <div className={styles['community-contentBox']}>
                    <Routes>
                        <Route path="/:category" element={<PostList selectedMenu={selectedMenu}/>} />
                        <Route path="/:category/view/:community_pk" element={<PostDetail />} />
                        <Route path="/update/:community_pk" element={<EditorUpdate />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;