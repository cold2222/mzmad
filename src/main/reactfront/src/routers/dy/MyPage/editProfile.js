import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ userNickname, profile, updateUser, history }) => {
    const [newNickname, setNewNickname] = useState(userNickname);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(profile); // 초기값은 프로필 이미지

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // 선택된 파일을 미리보기로 표시
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pk',sessionStorage.getItem('userId'));
            formData.append('nickname', newNickname);
            formData.append('profile', selectedFile);

            // 서버에 수정된 정보 전송
            const response = await axios.put('/api/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // 성공적으로 업데이트되었을 경우 updateUser 함수 호출하여 MyPage에 변경된 정보 반영
            updateUser(newNickname, profile);
            console.log('회원 정보가 성공적으로 수정되었습니다.');
            // 이전 페이지로 이동
            history.goBack();
        } catch (error) {
            console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
            <h2>회원 정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    새로운 닉네임:
                    <input type="text" value={newNickname} onChange={handleNicknameChange} />
                </label>
                <br />
                <label>
                    프로필 사진 업로드:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <br />
                {/* 이미지 미리보기 */}
                {selectedFile && (
                    <img src={previewImage} alt="Preview" style={{ width: '100px', height: '100px' }} />
                )}
                <br />
                <button type="submit">수정 완료</button>
            </form>
        </div>
    );
};

export default EditProfile;