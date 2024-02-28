import React, { useState } from 'react';
import './css/myPage.css';

const MyPage = () => {
    // 세션 스토리지에서 값 불러오기
    const userId = sessionStorage.getItem('userId');
    const userEmail = sessionStorage.getItem('userEmail');
    const userNickname = sessionStorage.getItem('userNickname');
    const platform = sessionStorage.getItem('platform');
    const coursesKey = sessionStorage.getItem('coursesKey');
    const isAdmin = sessionStorage.getItem('isAdmin');
    const userInfo = sessionStorage.getItem('userInfo');
    const profile = sessionStorage.getItem('profile');

    // 아이콘 URL 설정
    const iconUrl = coursesKey === '1' ? 'https://cdn-icons-png.flaticon.com/512/5883/5883300.png' : 'https://cdn-icons-png.flaticon.com/512/2089/2089784.png';

    // 값이 존재하는지 확인 후 페이지 렌더링
    return (
        <div className="mypage-container">
            <div className="mypage-content">
                <p>유저 이름: {userNickname}</p>
                <p>이메일: {userEmail}</p>
                <p>열쇠유무: {coursesKey !== null && <img src={iconUrl} alt="Key Icon" style={{ width: '100px', height: '100px' }} />}</p>
                <p><img src={profile} alt="Profile Image" style={{ width: '100px', height: '100px' }} /></p>
                <div className="button-container">
                    <button className="edit-button">회원수정</button>
                    <button className="delete-button">회원탈퇴</button>
                </div>
                
               
            </div>
        </div>
    );
};

export default MyPage;