import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './postList';
import PostDetail from './postDetail';
import EditorUpdate from '../Editor/EditorUpdate';
import Sidebar from './sidebar';
import styles from './css/communityPage.module.css';

const CommunityPage = () => {
    const [selectedMenu, setSelectedMenu] = useState("#home");
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // 부드러운 스크롤
        });
    };

    const handleSaveScrollPos = () => {
        setPrevScrollPos(window.scrollY);
    };

    const handleScrollRestore = () => {
        window.scrollTo({
            top: prevScrollPos,
            behavior: "smooth" // 부드러운 스크롤
        });
    };

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
                        <Route path="/:category" element={<PostList selectedMenu={selectedMenu} />} />
                        <Route
                            path="/:category/view/:community_pk"
                            element={
                                <PostDetail
                                    handleScrollToTop={handleScrollToTop}
                                    handleSaveScrollPos={handleSaveScrollPos}
                                    handleScrollRestore={handleScrollRestore}
                                    prevScrollPos={prevScrollPos}
                                    setPrevScrollPos={setPrevScrollPos}
                                />
                            }
                        />
                        <Route path="/update/:community_pk" element={<EditorUpdate />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;