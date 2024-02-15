import React from 'react';

const LoginPage = () => {
    const handleKakaoButtonClick = () => {
      
        
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=91d90742a34acf0eeafaf9fa92b63868&redirect_uri=http://localhost:3000/login/oauth2/callback/kakao&response_type=code`;
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <button
                onClick={handleKakaoButtonClick}
                style={{padding: '10px 20px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer'}}
            >
               카카오톡 로그인
            </button>
        </div>
    );
};

export default LoginPage;
