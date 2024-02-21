import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // js-cookie 라이브러리 import

const Home = () => {
  // 쿠키 값 상태 변수 정의
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [platform, setPlatform] = useState('');
  const [coursesKey, setCoursesKey] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [profile, setProfile] = useState('');

  // 페이지 로드 시 쿠키 값 가져오고 세션 스토리지에 저장하기
  useEffect(() => {
    // 쿠키 값 가져오기
    const fetchCookies = () => {
      // js-cookie를 사용하여 쿠키 값 가져오기
      const userIdCookie = Cookies.get('userId');
      const userEmailCookie = Cookies.get('userEmail');
      const userNicknameCookie = Cookies.get('userNickname');
      const platformCookie = Cookies.get('platform');
      const coursesKeyCookie = Cookies.get('coursesKey');
      const isAdminCookie = Cookies.get('isAdmin');
      const userInfoCookie = Cookies.get('userInfo');
      const profileCookie = Cookies.get('profile');

      // 가져온 쿠키 값 세션 스토리지에 저장하기
      if (userIdCookie) {
        setUserId(userIdCookie);
        sessionStorage.setItem('userId', userIdCookie);
      }
      if (userEmailCookie) {
        setUserEmail(userEmailCookie);
        sessionStorage.setItem('userEmail', userEmailCookie);
      }
      if (userNicknameCookie) {
        setUserNickname(userNicknameCookie);
        sessionStorage.setItem('userNickname', userNicknameCookie);
      }
      if (platformCookie) {
        setPlatform(platformCookie);
        sessionStorage.setItem('platform', platformCookie);
      }
      if (coursesKeyCookie) {
        setCoursesKey(coursesKeyCookie);
        sessionStorage.setItem('coursesKey', coursesKeyCookie);
      }
      if (isAdminCookie) {
        setIsAdmin(isAdminCookie);
        sessionStorage.setItem('isAdmin', isAdminCookie);
      }
      if (userInfoCookie) {
        setUserInfo(userInfoCookie);
        sessionStorage.setItem('userInfo', userInfoCookie);
      }
      if (profileCookie) {
        setProfile(profileCookie);
        sessionStorage.setItem('profile', profileCookie);
      }
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
      <p>User ID: {sessionStorage.getItem('userId')}</p>
      <p>User Email: {sessionStorage.getItem('userEmail')}</p>
      <p>User Nickname: {sessionStorage.getItem('userNickname')}</p>
      <p>Platform: {sessionStorage.getItem('platform')}</p>
      <p>Courses Key: {sessionStorage.getItem('coursesKey')}</p>
      <p>Is Admin: {sessionStorage.getItem('isAdmin')}</p>
      <p>UserINFO: {sessionStorage.getItem('userInfo')}</p>
      <p><img src={sessionStorage.getItem('profile')} alt="Profile Image" /></p>
    </div>
  );
};

export default Home;