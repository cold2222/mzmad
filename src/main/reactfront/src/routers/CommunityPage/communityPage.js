import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './postList';
import PostDetail from './postDetail';
import EditorUpdate from '../Editor/EditorUpdate';
import Sidebar from './sidebar';
import styles from './css/communityPage.module.css';
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const CommunityPage = () => {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [inView, setInView] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("#home");
    const [search , setSearch] = useState("null");
    const [searchCondition, setSearchCondition] = useState("null");
    const [posts, setPosts] = useState([]);

    const totalPageCount = useRef(0);
    const page = useRef(0);
    
    const handleSearch = (searchInput) => {
        setSearch(searchInput);
    }

    const handleSearchCondition = (searchSelect) => {
        setSearchCondition(searchSelect);
    }

    const handleInView = (inView) => {
        setInView(inView);
    }
    const handleMenuChange = (category) => {
        setCategory(category);
    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/community/selectAll/${category}/${page.current}/${search}/${searchCondition}`);
            if (page.current === 0) {
                setPosts(response.data.communityList);
                page.current += 1;
            } else {
                setPosts(prevPosts => [...prevPosts, ...response.data.communityList]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const searchStart = () => {
        page.current = 0;
        setPosts([]);
      };

    useEffect(() => {
        if(category !== ""){
            console.log("category이펙트안 작동");
    
            const getTotalCount = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/community/getTotalCount/${category}/${search}/${searchCondition}`);
                    totalPageCount.current = response.data.totalPageCount;
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            };
            getTotalCount();
    
            page.current = 0;
            setPosts([])
    
            if (category === "home") {
                setSelectedMenu("#Home");
            } else if (category === "free") {
                setSelectedMenu("#자유게시판");
            } else if (category === "tip") {
                setSelectedMenu("#글쓰기 Tip 공유게시판");
            } else if (category === "assignment") {
                setSelectedMenu("#과제게시판");
            }else if (category === "portfolio") {
                setSelectedMenu("#포트폴리오");
            }
            fetchData();
        }
    }, [category,search]);

    useEffect(() => {
        handleSearch("null")
        handleSearchCondition("null");
    }, [category]);

    useEffect(() => {
        if (inView && posts.length < totalPageCount.current) {
            console.log(inView, '무한 스크롤 요청')
            fetchData();
            page.current += 1;
        }
    }, [inView]);

    return (
        <div className={styles['community-container']}>
            <div className={styles['community-head-div']}>
                <h2 className={styles['community-head']}>커뮤니티 페이지</h2>
            </div>
            <div className={styles['community-content']}>
                <Sidebar onSelectMenu={handleMenuChange} />
                <div className={styles['community-contentBox']}>
                    <Routes>
                        <Route path="/:categoryName" element={<PostList 
                        selectedMenu={selectedMenu} posts={posts} loading={loading} category={category}
                         handleMenuChange={handleMenuChange} handleSearch={handleSearch} handleInView={handleInView} 
                         handleSearchCondition={handleSearchCondition} searchStart={searchStart} />} />
                        <Route path="/:categoryName/view/:community_pk" element={<PostDetail />} />
                        <Route path="/update/:community_pk" element={<EditorUpdate />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;