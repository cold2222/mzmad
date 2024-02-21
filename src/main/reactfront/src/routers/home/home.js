import React, { useState, useEffect } from 'react';

const Home = () => {
  // 쿠키 값 상태 변수 정의
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [platform, setPlatform] = useState('');
  const [coursesKey, setCoursesKey] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [userInfo,setUserInfo]= useState('') ;

  // 페이지 로드 시 쿠키 값 가져오기
  useEffect(() => {
    // 쿠키 값 가져오기
    const fetchCookies = () => {
      const cookies = document.cookie.split(';'); // 쿠키 문자열을 ; 이거 기준으로 분리해둠
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('='); // 쿠키 이름과 값으로 분리 ㅇㅇ
        switch (name.trim()) {
          case 'userId':
            setUserId(value);
            break;
          case 'userEmail':
            setUserEmail(value);
            break;
          case 'userNickname':
            setUserNickname(value);
            break;
          case 'platform':
            setPlatform(value);
            break;
          case 'coursesKey':
            setCoursesKey(value);
            break;
          case 'isAdmin':
            setIsAdmin(value);
            break;
            case 'userInfo':
              setUserInfo(value);
            
          default:
            break;
        }
      });
    };

    // 페이지 로드 시 실행함요
    fetchCookies();

    
    return () => {
      
    };
  }, []); // useEffect를 한 번만 실행하도록 빈 배열 박아둠

  // 쿠키 값 사용 예시
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