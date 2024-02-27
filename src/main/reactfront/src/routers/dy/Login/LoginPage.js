import React from 'react';



const LoginPage = () => {

    const handleKakaoButtonClick = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=91d90742a34acf0eeafaf9fa92b63868&redirect_uri=http://localhost:3000/login/oauth2/callback/kakao&response_type=code`;
    };

    const handleGoogleButtonClick = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=393362342556-5i5uja3d121llqoh1bfsvhpguboncap7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/login/oauth2/callback/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`; // 구글 로그인 링크 추가
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <img
                src='/img/kakao_login_large_narrow.png' // 카카오 이미지 파일 경로 설정
                alt="Kakao Login"
                onClick={handleKakaoButtonClick}
                style={{width: '200px', height: 'auto', cursor: 'pointer', marginRight: '20px'}}
            />
            <img
                src='/img/web_neutral_sq_ctn@2x.png' // 구글 이미지 파일 경로 설정
                alt="Google Login"
                onClick={handleGoogleButtonClick}
                style={{width: '200px', height: 'auto', cursor: 'pointer'}}
            />
        </div>
    );
};

export default LoginPage;