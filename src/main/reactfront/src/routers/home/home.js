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

  // 페이지 로드 시 쿠키 값 가져오고 세션 스토리지에 저장하기
  useEffect(() => {
    // 쿠키 값 가져오기
    const fetchCookies = () => {
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        switch (name.trim()) {
          case 'userId':
            setUserId(value);
            sessionStorage.setItem('userId', value); // 세션 스토리지에 저장
            break;
          case 'userEmail':
            setUserEmail(value);
            sessionStorage.setItem('userEmail', value);
            break;
          case 'userNickname':
            setUserNickname(value);
            sessionStorage.setItem('userNickname', value);
            break;
          case 'platform':
            setPlatform(value);
            sessionStorage.setItem('platform', value);
            break;
          case 'coursesKey':
            setCoursesKey(value);
            sessionStorage.setItem('coursesKey', value);
            break;
          case 'isAdmin':
            setIsAdmin(value);
            sessionStorage.setItem('isAdmin', value);
            break;
          case 'userInfo':
            setUserInfo(value);
            sessionStorage.setItem('userInfo', value);
            break;
          default:
            break;
        }
      });
    };

    // 페이지 로드 시 실행
    fetchCookies();

    // cleanup 함수
    return () => {
      // cleanup 코드
    };
  }, []); // useEffect를 한 번만 실행하도록 빈 배열 전달

  // 쿠키 값 사용 및 세션 스토리지에 저장된 값 사용
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