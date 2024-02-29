import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/myPage.css';

const MyPage = () => {
    // 세션 스토리지에서 값 불러오기
    const [userNickname, setUserNickname] = useState(sessionStorage.getItem('userNickname'));
    const [profile, setProfile] = useState(sessionStorage.getItem('profile'));

    // 아이콘 URL 설정
    const coursesKey = sessionStorage.getItem('coursesKey');
    const profileImagePath = profile.replace('src/main/reactfront/public', process.env.PUBLIC_URL);
    const iconUrl = coursesKey === '1' ? 'https://cdn-icons-png.flaticon.com/512/5883/5883300.png' : 'https://cdn-icons-png.flaticon.com/512/2089/2089784.png';

    // 회원 탈퇴 함수
    const handleDelete = async () => {
        try {
            // 여기에 서버에 회원 탈퇴 요청을 보내는 코드 작성
            console.log('회원 탈퇴가 완료되었습니다.');
        } catch (error) {
            console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
        }
    };

    // 값이 존재하는지 확인 후 페이지 렌더링
    return (
        <div className="mypage-container">
            <div className="mypage-content">
                <p>유저 이름: {userNickname}</p>
                <p>이메일: {sessionStorage.getItem('userEmail')}</p>
                <p>열쇠유무: {coursesKey !== null && <img src={iconUrl} alt="Key Icon" style={{ width: '100px', height: '100px' }} />}</p>
                <p><img src={profileImagePath} alt="Profile Image" style={{ width: '100px', height: '100px' }} /></p>
                <div className="button-container">
                    <Link to="/edit-profile" className="edit-button">회원수정</Link>
                    <button className="delete-button" onClick={handleDelete}>회원탈퇴</button>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
