import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


const KakaoRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOAuthKakao = async (code) => {
        try {
            // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
            const header = {"Content-type":"application/json"}
            const crossOriginIsolated = {withCredentials: true}
            const response = await axios.post(`http://localhost:8080/login/oauth2/callback/kakao?code=${code}`,header,crossOriginIsolated);
            console.log(response);
            const data = response.data; // 응답 데이터
            console.log(data);
            console.log(Cookies.get("userId"));
            console.log(Cookies.get("userInfo"))

             navigate("/");  
            
         // 성공 시 메인 페이지로 이동
        } catch (error) {
            navigate("/fail");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            handleOAuthKakao(code);
        }
    }, []); // location을 의존성 배열에서 제거

    return (
        <div>
            <div>Processing...</div>
        </div>
    );
};

export default KakaoRedirectPage;