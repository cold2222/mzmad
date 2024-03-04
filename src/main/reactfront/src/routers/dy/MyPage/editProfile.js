import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ userNickname, profile}) => {
    const [newNickname, setNewNickname] = useState(userNickname || ''); 
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(profile || ''); 

    const navigate = useNavigate();

    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

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
            formData.append('pk', sessionStorage.getItem('userId'));
            formData.append('nickname', newNickname);
            formData.append('profile', selectedFile);
    
            const response = await axios.put('/api/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('회원 정보가 성공적으로 수정되었습니다.');

            
                
                sessionStorage.setItem('userNickname', newNickname);
                sessionStorage.setItem('profile', previewImage);
                console.log('셋했어요')
           
                navigate('/mypage');
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