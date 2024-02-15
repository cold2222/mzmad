import React, { useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import axios from "axios";
import "./Editor.module.css";

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
            title: document.querySelector("#title").value,
            category: document.querySelector("#category").value,
            content: richText
        };

        try {
            const response = await axios.post("http://localhost:8080/community/insert", postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
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
        <div className="editor-container">
            <div className="editor-content">
                <div className="editor-header">글쓰기</div>
                <form id="editor-form" onSubmit={createPost}>
                    <input name="title" className="title" placeholder="제목" type="text" />
                    <select id="category" name="category" className="editor-selectbox">
                        <option value="">카테고리 선택</option>
                        <option value="test1">test1</option>
                        <option value="test2">test2</option>
                        <option value="test3">test3</option>
                        <option value="test4">test4</option>
                        <option value="test5">test5</option>
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
                    <button className="editor-button" >
                        제출
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Editor;