import React, { useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import styles from "./Editor.module.css"; // 모듈 CSS 파일 import

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ placeholder, value, ...rest }) => {
    const quillRef = useRef(null);
    const [richText, setRichText] = useState('');

    const handleChange = (content) => {
        setRichText(content);
        console.log(content)
    };


    const createPost = async (event) => {
        event.preventDefault();
        const postData = {
            user_pk : sessionStorage.getItem('userId'),
            community_title: document.querySelector("#title").value,
            community_category: document.querySelector("#category").value,
            community_content: richText
        };

        try {
            const response = await axios.post("http://localhost:8080/community/insert", postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            window.location.href="http://localhost:3000/community/home";
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    };

    useEffect(() => {
        const handleImage = () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.onchange = async () => {
                const file = input.files[0];
                if (!file) return;
                console.log(file.name);
                const range = quillRef.current.getEditor().getSelection(true);
                quillRef.current.getEditor().insertEmbed(range.index, "image", `/UploadImage/loading.gif`);

                try {
                    const formData = new FormData();
                    formData.append("image", file);

                    // 이미지를 서버에 업로드하는 API 호출
                    const response = await fetch("http://localhost:8080/community/image", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error("Failed to upload image");
                    }

                    const imageUrl = await response.json();
                    console.log(imageUrl.imageUrl);

                    quillRef.current.getEditor().deleteText(range.index, 1);
                    quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl.imageUrl);

                    quillRef.current.getEditor().setSelection(range.index + 1);
                } catch (error) {
                    console.error("Image upload error:", error);
                    quillRef.current.getEditor().deleteText(range.index, 1);
                }
            };
        };

        if (quillRef.current) {
            const toolbar = quillRef.current.getEditor().getModule("toolbar");
            toolbar.addHandler("image", handleImage);
        }
    }, []);

    return (
        <div className={styles['post-detail-container']}>
            <div className={styles['post-detail-contents']}>
                <div className={styles['editor-header']}>글쓰기</div>
                <form id="editor-form" className={styles['editor-form']} onSubmit={createPost}>
                    <input id="title" className={styles.title} placeholder="제목" type="text" />
                    <select id="category" name="category" className={styles['editor-selectbox']}>
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