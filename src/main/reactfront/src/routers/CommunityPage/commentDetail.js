import React, { useState } from 'react';
import styles from './css/commentDetail.module.css';
import axios from "axios";
import { toast } from "react-toastify";
import ReCommentDetail from './reCommentDetail';

const CommentDetail = ({ comments, handleCommentUpdate }) => {

    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글의 ID를 저장하는 상태
    const [updateComment, setUpdateComment] = useState('');
    
    const [reCommentBox, setReCommentBox] = useState(null);
    const [reCommentContent, setReCommentContent] = useState("");

    const handleCommentChange = (event) => {
        setUpdateComment(event.target.value);
    };
    
    const handleReCommentChange = (event) => {
        setReCommentContent(event.target.value);
    };

    function commentWriterCheck(comment) {
        let userID = sessionStorage.getItem('userId');
        if (userID !== comment.userDTO.user_pk) {
            return true;
        }
        return false;
    }
    function reComment(comment) {
        setReCommentBox(comment.community_comment_pk)
    }

    function communityCommentDelete(comment) {
        if (commentWriterCheck(comment)) {
            toast.error("권한이 없습니다");
            return;
        }

        if (window.confirm('삭제하시겠습니까?')) {
            let community_comment_pk = comment.community_comment_pk;
            axios.delete('http://localhost:8080/community/comment/delete', { data: community_comment_pk })
                .then(response => {
                    console.log('댓글 삭제 성공:', response.data);
                    handleCommentUpdate();
                    toast.error("삭제 완료");
                })
                .catch(error => {
                    console.error('데이터 업데이트 실패:', error);
                });
        }
    }

    function handleEdit(comment) {
        let updateCommentContent = comment.community_comment_content.replace(/<br>/g, '\n');;
        setUpdateComment(updateCommentContent);
        setEditingComment(comment.community_comment_pk);
    }
    function handlecancel() {
        setEditingComment(null);
        setReCommentBox(null);
    }

    function handleSave(comment) {
        if (commentWriterCheck(comment)) {
            toast.error("권한이 없습니다");
            return;
        }

        if (window.confirm('수정하시겠습니까?')) {
            let community_comment_pk = comment.community_comment_pk;
            console.log(updateComment);
            console.log("업데이트할 내용");

            let community_comment_content = updateComment;
            axios.put('http://localhost:8080/community/comment/update', { community_comment_pk, community_comment_content })
                .then(response => {
                    console.log('댓글 수정 성공:', response.data);
                    handleCommentUpdate();
                    setReCommentContent('');
                    toast.error("수정 완료");
                })
                .catch(error => {
                    console.error('데이터 업데이트 실패:', error);
                });

        }
        setEditingComment(null);
    }

    function insertRecomment(comment){

        if (window.confirm('등록하시겠습니까?')) {
            let community_recomment_community_comment_pk = comment.community_comment_pk;
            console.log(reCommentContent);
            console.log("리코멘트 등록할 내용");
            let community_recomment_user_pk = sessionStorage.getItem('userId');
            let community_recomment_content = reCommentContent;
            axios.post('http://localhost:8080/community/recomment/insert', { 
                community_recomment_community_comment_pk,
                community_recomment_content,
                community_recomment_user_pk
            })
                .then(response => {
                    console.log('리댓글 등록 성공:', response.data);
                    handleCommentUpdate();
                    toast.error("등록 완료");
                })
                .catch(error => {
                    console.error('데이터 업데이트 실패:', error);
                });

        }
        setReCommentBox(null);
    }

    return (
        <div>
            {comments.length > 0 && (
                <ul className={styles.commentList}>
                    {comments.map(comment => (
                        <li key={comment.community_comment_pk} className={styles.commentItem}>
                            {editingComment === comment.community_comment_pk ? (
                                <textarea
                                    onChange={handleCommentChange}
                                    className={styles.commentContent}
                                    value={updateComment}
                                />
                            ) : (
                                <p className={styles.commentContent} dangerouslySetInnerHTML={{ __html: comment.community_comment_content }}></p>
                            )}
                            <p className={styles.commentInfo}>
                                <span className={styles.commentAuthor}>작성자: {comment.userDTO.user_nickname}</span>
                                <span className={styles.commentDate}>작성일: {comment.community_comment_date}</span>
                            </p>
                            <div className={styles.commentContentButton}>
                                <p>
                                    {editingComment === comment.community_comment_pk ? (
                                        <>
                                            <button onClick={() => handleSave(comment)}>저장</button>
                                            <button onClick={() => handlecancel()}>취소</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => reComment(comment)}>리댓글 달기</button>
                                            <button onClick={() => handleEdit(comment)}>수정</button>
                                            <button onClick={() => communityCommentDelete(comment)}>삭제</button>
                                        </>
                                    )}
                                </p>
                            </div>
                            {reCommentBox === comment.community_comment_pk &&
                                <div>
                                    <div>리댓글 달기</div>
                                    <textarea 
                                        onChange={handleReCommentChange}
                                        value={reCommentContent}
                                    />
                                    <div>
                                        <button onClick={() => insertRecomment(comment)}>등록</button>
                                        <button onClick={() => handlecancel()}>취소</button>
                                    </div>
                                </div>
                            }
                            <ReCommentDetail comment={comment}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CommentDetail;