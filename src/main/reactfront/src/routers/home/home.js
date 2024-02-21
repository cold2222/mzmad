import React, { useState, useEffect } from 'react';

const Home = () => {
  // 쿠키 값 상태 변수 정의
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [platform, setPlatform] = useState('');
  const [coursesKey, setCoursesKey] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const fetchCookies = () => {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        switch (name.trim()) {
          case 'userId':
            sessionStorage.setItem('userId', value);
            break;
          case 'userEmail':
            sessionStorage.setItem('userEmail', value);
            break;
          case 'userNickname':
            sessionStorage.setItem('userNickname', value);
            break;
          case 'platform':
            sessionStorage.setItem('platform', value);
            break;
          case 'coursesKey':
            sessionStorage.setItem('coursesKey', value);
            break;
          case 'isAdmin':
            sessionStorage.setItem('isAdmin', value);
            break;
          case 'userInfo':
            sessionStorage.setItem('userInfo', value);
            break;
          default:
            break;
        }
      });

      setUserId(sessionStorage.getItem('userId'));
      setUserEmail(sessionStorage.getItem('userEmail')); // 수정된 부분
      setUserNickname(sessionStorage.getItem('userNickname')); // 수정된 부분
      setUserNickname(sessionStorage.getItem('userNickname')); // 수정된 부분
      setPlatform(sessionStorage.getItem('platform')); // 수정된 부분
      setCoursesKey(sessionStorage.getItem('coursesKey')); // 수정된 부분
      setIsAdmin(sessionStorage.getItem('isAdmin')); // 수정된 부분
      setUserInfo(sessionStorage.getItem('userInfo')); // 수정된 부분

    };
    fetchCookies();

    return () => {
    };
  }, []); // 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 함

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>User Email: {userEmail}</p>
      <p>User Nickname: {userNickname}</p>
      <p>Platform: {platform}</p>
      <p>Courses Key: {coursesKey}</p>
      <p>Is Admin: {isAdmin}</p>
      <p>UserINFO: {userInfo}</p>
    </div>
  );
};

export default Home;