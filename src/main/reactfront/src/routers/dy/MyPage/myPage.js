    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import Modal from 'react-modal';
    import '../MyPage/css/myPage.css'; // CSS 파일을 import

    const MyPage = () => {
        const [userNickname, setUserNickname] = useState('');
        const [profile, setProfile] = useState('');
        const [coursesKey, setCoursesKey] = useState('');
        const [profileImagePath, setProfileImagePath] = useState('');
        const [showDeleteModal, setShowDeleteModal] = useState(false); // 삭제 모달 상태

        useEffect(() => {
            setUserNickname(sessionStorage.getItem('userNickname') || '');
            setProfile(sessionStorage.getItem('profile') || '');
            setCoursesKey(sessionStorage.getItem('coursesKey') || '');
        }, []); 

        useEffect(() => {
            if (profile) {
                setProfileImagePath(profile.replace('src/main/reactfront/public', process.env.PUBLIC_URL));
            }
        }, [profile]); 

        const handleDelete = async () => {
            try {
                
                const deleteUrl = '/api/delete';
        
               
                const userId = sessionStorage.getItem('userId');
        
                
                const formData = new FormData();
                formData.append('user_pk', userId);
        
               
                const response = await fetch(deleteUrl, {
                    method: 'DELETE',
                    body: formData,
                });
        
                
                if (response.ok) {
                    console.log('회원 탈퇴가 완료되었습니다.');
                    setShowDeleteModal(false); 

                    sessionStorage.removeItem('userId'); 
                    sessionStorage.removeItem('userEmail');
                    sessionStorage.removeItem('userNickname');
                    sessionStorage.removeItem('platform');
                    sessionStorage.removeItem('isAdmin');
                    sessionStorage.removeItem('coursesKey');
                    sessionStorage.removeItem('profile');
                    window.location.href='/';


                } else {
                    
                    console.error('회원 탈퇴 중 오류가 발생했습니다:', response.statusText);
                }
            } catch (error) {
                console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
            }
            



        };

        return (
            <div className="mypage-container">
                <div className="mypage-content">
                <p className='mypage-title'>
                    MyPage
                </p>
                    <p>유저 이름: {userNickname}</p>
                    <p>이메일: {sessionStorage.getItem('userEmail')}</p>
                    <p className="key-icon">열쇠유무: {coursesKey !== null && <img src={coursesKey === '1' ? 'https://cdn-icons-png.flaticon.com/512/5883/5883300.png' : 'https://cdn-icons-png.flaticon.com/512/2089/2089784.png'} alt="Key Icon"/>}</p>
                    <p className="profile-image">프로필 사진:<img src={profileImagePath} alt="Profile Image"/></p>
                    <div className="button-container">
                        <Link to="/edit-profile" className="edit-button">회원수정</Link>
                        <button className="delete-button" onClick={() => setShowDeleteModal(true)}>회원탈퇴</button>
                    </div>
                </div>
                {/* 삭제 모달 */}
                <Modal
                    isOpen={showDeleteModal}
                    onRequestClose={() => setShowDeleteModal(false)}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>회원 탈퇴</h2>
                    <p>정말로 탈퇴하시겠습니까?</p>
                    <button onClick={handleDelete} className="yes-button">네</button>
                    <button onClick={() => setShowDeleteModal(false)} className="no-button">아니오</button>
                </Modal>
            </div>
        );
    };

    export default MyPage;