import React, { useRef, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import styles from "./Editor.module.css";
import { useNavigate } from 'react-router-dom';

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ placeholder, ...rest }) => {
    const navigate = useNavigate();
    const quillRef = useRef(null);
    const { community_pk } = useParams();
    const [post, setPost] = useState({ community_title: '', community_category: '' }); // 초기값 설정
    const [richText, setRichText] = useState('');

    const handleUpdatePost = () => {
        navigate(-1);
      };

    useEffect(() => {
        function communityUpdate() {
            axios.get(`http://localhost:8080/community/view/${community_pk}`)
                .then(response => {
                    console.log('게시글 불러오기:', response.data);
                    setPost(response.data);
                    setRichText(response.data.community_content)
                })
                .catch(error => {
                    console.error('데이터 불러오기 실패:', error);
                });
        }

        communityUpdate();
    }, [community_pk]);

    const handleChange = (content) => {
        setRichText(content);
        console.log(content);
    };

    const updatePost = async (event) => {
        event.preventDefault();
        
        const updatedPostData = {
            ...post,
            community_content: richText
        };
    
        try {
            const response = await axios.put("http://localhost:8080/community/update", updatedPostData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            
            handleUpdatePost();
        } catch (error) {
            console.error("Error updating post:", error);
            throw new Error("Failed to update post");
        }
    };

    return (
        <div className={styles['post-detail-container']}>
            <div className={styles['post-detail-contents']}>
                <div className={styles['editor-header']}>수정하기</div>
                <form id="editor-form" className={styles['editor-form']} onSubmit={updatePost}>
                    <input id="title" value={post.community_title} onChange={(e) => setPost({ ...post, community_title: e.target.value })} className={styles.title} placeholder="제목" type="text" />
                    <select id="category" value={post.community_category} onChange={(e) => setPost({ ...post, community_category: e.target.value })} className={styles['editor-selectbox']}>
                        <option value="">카테고리 선택</option>
                        <option value="#자유게시판">#자유게시판</option>
                        <option value="#글쓰기Tip공유게시판">#글쓰기Tip공유게시판</option>
                        <option value="#과제게시판">#과제게시판</option>
                    </select>
                    <ReactQuill
                        style={{ width: "800px", height: "600px" }}
                        {...rest}
                        ref={quillRef}
                        value={richText}
                        onChange={handleChange}
                        theme="snow"
                        modules={{
                            toolbar: {
                                container: [
                                    ["link", "image", "video"],
                                    [{ header: [1, 2, 3, false] }],
                                    ["bold", "italic", "underline", "strike"],
                                    ["blockquote"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    [{ color: [] }, { background: [] }],
                                    [{ align: [] }],
                                ],
                            },
                            imageResize: {
                                parchment: Quill.import("parchment"),
                                modules: ["Resize", "DisplaySize", "Toolbar"],
                            },
                        }}
                        formats={[
                            "header",
                            "font",
                            "size",
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "align",
                            "blockquote",
                            "list",
                            "bullet",
                            "indent",
                            "background",
                            "color",
                            "link",
                            "image",
                            "video",
                            "width",
                        ]}
                        placeholder={placeholder}
                        preserveWhitespace
                    />
                    <button className={styles['editor-button']} type="submit">
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Editor;