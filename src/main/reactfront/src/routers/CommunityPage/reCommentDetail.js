import React, { useState } from 'react';
import styles from './css/reCommentDetail.module.css';
import axios from "axios";
import { toast } from "react-toastify";

const ReCommentDetail = (props) => {

  const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글의 ID를 저장하는 상태
  const [updateRecomment, setUpdateRecomment] = useState(''); // 리코멘트 textera 값

  const { comment } = props;
  const { handleCommentUpdate } = props;

  function handleEdit(reComment) {
    let updateCommentContent = reComment.community_recomment_content.replace(/<br>/g, '\n');;
    setUpdateRecomment(updateCommentContent);
    setEditingComment(reComment.community_recomment_pk);
  }

  function handlecancel(){
    setEditingComment(null);
  }

  const handleCommentChange = (event) => {
    setUpdateRecomment(event.target.value);
};

  function handleSave(reComment){
    if (window.confirm('수정하시겠습니까?')) {
      let community_recomment_pk = reComment.community_recomment_pk;

      let community_recomment_content = updateRecomment;
      axios.put('http://localhost:8080/community/recomment/update', { community_recomment_pk, community_recomment_content })
          .then(response => {
              console.log('댓글 수정 성공:', response.data);
              handleCommentUpdate();
              setUpdateRecomment('');
              toast.error("수정 완료");
          })
          .catch(error => {
              console.error('데이터 업데이트 실패:', error);
          });

  }
  setEditingComment(null);
  }

  function communityCommentDelete(reComment) {

    if (window.confirm('삭제하시겠습니까?')) {
      let community_recomment_pk = reComment.community_recomment_pk;
      axios.delete('http://localhost:8080/community/recomment/delete', { data: community_recomment_pk })
        .then(response => {
          console.log('리댓글 삭제 성공:', response.data);
          handleCommentUpdate();
          toast.error("삭제 완료");
        })
        .catch(error => {
          console.error('데이터 업데이트 실패:', error);
        });
    }
  }

  return (

    <div>

      {comment.recommentList[0].community_recomment_community_comment_pk !== 0 ?
        <ul className={styles.commentList}>
          {comment.recommentList.map(reComment => (
            <div key={reComment.community_recomment_pk} className={styles.commentItem}>
              {editingComment === reComment.community_recomment_pk ? (
                                <textarea
                                    onChange={handleCommentChange}
                                    className={styles.reCommentContent}
                                    value={updateRecomment}
                                />
                            ) : (
                                <p className={styles.commentContent} dangerouslySetInnerHTML={{ __html: reComment.community_recomment_content }}></p>
                            )}
              <div className={styles.commentInfo}>
                <span className={styles.commentAuthor}>작성자: {reComment.userDTO.user_nickname}</span>
                <span className={styles.commentDate}>작성일: {reComment.community_recomment_date}</span>
                {editingComment === reComment.community_recomment_pk ? (
                                        <div className={styles.reCommentButton}>
                                            <button onClick={() => handleSave(reComment)}>저장</button>
                                            <button onClick={() => handlecancel()}>취소</button>
                                        </div>
                                    ) : (
                                      reComment.userDTO.user_pk === sessionStorage.getItem('userId') ? (
                                        <div className={styles.reCommentButton}>
                                            <button onClick={() => handleEdit(reComment)}>수정</button>
                                            <button onClick={() => communityCommentDelete(reComment)}>삭제</button>
                                        </div>
                                    ) : null
                                    )}
              </div>
            </div>
          ))}
        </ul>
        : ""}
    </div>
  );
}

export default ReCommentDetail;