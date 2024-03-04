import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [platform, setPlatform] = useState('');
  const [coursesKey, setCoursesKey] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [profile, setProfile] = useState('');

  useEffect(() => {
    // 세션 스토리지 값 상태 업데이트 함수
    const updateSessionStorageValues = () => {
      setUserId(sessionStorage.getItem('userId') || '');
      setUserEmail(sessionStorage.getItem('userEmail') || '');
      setUserNickname(sessionStorage.getItem('userNickname') || '');
      setPlatform(sessionStorage.getItem('platform') || '');
      setCoursesKey(sessionStorage.getItem('coursesKey') || '');
      setIsAdmin(sessionStorage.getItem('isAdmin') || '');
      setProfile(sessionStorage.getItem('profile') || '');
    };

    // 페이지 로드 시 세션 스토리지 값으로 상태 초기화
    updateSessionStorageValues();

    // 이벤트 리스너 등록하여 세션 스토리지 값이 변경될 때마다 상태 업데이트
    window.addEventListener('storage', updateSessionStorageValues);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', updateSessionStorageValues);
    };
  }, []);

  useEffect(() => {
    // 페이지 로드 시 쿠키 값을 세션 스토리지에 저장하고 쿠키를 제거
    const fetchCookies = () => {
      const userIdCookie = Cookies.get('userId');
      const userEmailCookie = Cookies.get('userEmail');
      const userNicknameCookie = Cookies.get('userNickname');
      const platformCookie = Cookies.get('platform');
      const coursesKeyCookie = Cookies.get('coursesKey');
      const isAdminCookie = Cookies.get('isAdmin');
      const profileCookie = Cookies.get('profile');
  
      if (userIdCookie) {
        sessionStorage.setItem('userId', userIdCookie);
        setUserId(userIdCookie); // 상태 업데이트
        Cookies.remove('userId'); // 쿠키 제거
      }
      if (userEmailCookie) {
        sessionStorage.setItem('userEmail', userEmailCookie);
        setUserEmail(userEmailCookie); // 상태 업데이트
        Cookies.remove('userEmail'); // 쿠키 제거
      }
      if (userNicknameCookie) {
        sessionStorage.setItem('userNickname', userNicknameCookie);
        setUserNickname(userNicknameCookie); // 상태 업데이트
        Cookies.remove('userNickname'); // 쿠키 제거
      }
      if (platformCookie) {
        sessionStorage.setItem('platform', platformCookie);
        setPlatform(platformCookie); // 상태 업데이트
        Cookies.remove('platform'); // 쿠키 제거
      }
      if (coursesKeyCookie) {
        sessionStorage.setItem('coursesKey', coursesKeyCookie);
        setCoursesKey(coursesKeyCookie); // 상태 업데이트
        Cookies.remove('coursesKey'); // 쿠키 제거
      }
      if (isAdminCookie) {
        sessionStorage.setItem('isAdmin', isAdminCookie);
        setIsAdmin(isAdminCookie); // 상태 업데이트
        Cookies.remove('isAdmin'); // 쿠키 제거
      }
      if (profileCookie) {
        sessionStorage.setItem('profile', profileCookie);
        setProfile(profileCookie); // 상태 업데이트
        Cookies.remove('profile'); // 쿠키 제거
      }
    };
  
    fetchCookies();
  }, []);


  return (
    <div>
      <p>User ID: {userId}</p>
      <p>User Email: {userEmail}</p>
      <p>User Nickname: {userNickname}</p>
      <p>Platform: {platform}</p>
      <p>Courses Key: {coursesKey}</p>
      <p>Is Admin: {isAdmin}</p>
      
      
    </div>
  );
};

export default Home;