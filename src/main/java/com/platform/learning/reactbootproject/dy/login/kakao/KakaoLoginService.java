package com.platform.learning.reactbootproject.dy.login.kakao;


import java.util.List;
import java.util.Objects;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    private final KakaoMapper kakaoMapper;
    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    

    public String socialLogin(String code, String registrationId, HttpSession session, Model model,HttpServletResponse response) {
        String accessToken = getAccessToken(code, registrationId);
        System.out.println("112213123213213213123123");
        System.out.println("accessToken = " + accessToken);
        System.out.println(registrationId);
        JsonNode result = getUserInfo(accessToken, registrationId);

        System.out.println("result test" + result);

        String id = result.get("id").toString();
        String email = result.get("kakao_account").get("email").toString().replaceAll("\"", "");
        String nickname = result.get("properties").get("nickname").toString().replaceAll("\"", "");
        String platform = registrationId;
        

        System.out.println("id = " + id);
        System.out.println("email = " + email);
        System.out.println("nickname = " + nickname);
        System.out.println("platform = "+ platform);


        List<KakaoUserDTO> existingUsers = kakaoMapper.SelUser(id);

        System.out.println(existingUsers);
        System.out.println("잘된다잉");

        if (existingUsers.size()==1) {
            
            System.out.println("이미 있는 아이디입니다.");

            // 이미 존재하는 사용자에 대한 추가 작업 수행

            if (Objects.isNull(kakaoMapper.selectUserTableInfo(id))) {
                KakaoUserDTO userTableInfo = kakaoMapper.selectUserTableInfo(id);
                System.out.println(userTableInfo);
                // Cookie userIdCookie = new Cookie("userId", id);
                // Cookie userEmailCookie = new Cookie("userEmail", email);
                // Cookie userNicknameCookie = new Cookie("userNickname", nickname);
                // Cookie platformCookie = new Cookie("platform", platform);
                Cookie coursesKeyCookie = new Cookie("coursesKey", "0");
                Cookie isAdminCookie = new Cookie("isAdmin", "0");
                Cookie userInfo = new Cookie("userInfo", userTableInfo.toString());
                System.out.println("=================================== 여기 걸림?");
                System.out.println(userInfo);
                System.out.println(userInfo);
                System.out.println("쿠키 확인 = "+userInfo);
                // System.out.println("쿠키 확인 = "+userEmailCookie);
                // System.out.println("쿠키 확인 = "+userNicknameCookie);
                // 쿠키 만료 시간 설정 (예: 1시간)
                int cookieMaxAge = 3600;
                // userIdCookie.setMaxAge(cookieMaxAge);
                // userEmailCookie.setMaxAge(cookieMaxAge);
                // userNicknameCookie.setMaxAge(cookieMaxAge);
                // platformCookie.setMaxAge(cookieMaxAge);
                // corsesKeyCookie.setMaxAge(cookieMaxAge);
                // isAdminCookie.setMaxAge(cookieMaxAge);
                // response.addCookie(userIdCookie);
                // response.addCookie(userEmailCookie);
                // response.addCookie(userNicknameCookie);
                // response.addCookie(platformCookie);
                response.addCookie(coursesKeyCookie);
                response.addCookie(isAdminCookie);
                return "suceess";

            } else {
                KakaoUserDTO userTableInfo = kakaoMapper.selectUserTableInfo(id);
                System.out.println(userTableInfo);
                Cookie userInfo = new Cookie("userInfo", userTableInfo.toString());
                Cookie userIdCookie = new Cookie("userId", id);
                Cookie userEmailCookie = new Cookie("userEmail", email);
                Cookie userNicknameCookie = new Cookie("userNickname", nickname);
                Cookie platformCookie = new Cookie("platform", platform);
                Cookie coursesKeyCookie = new Cookie("coursesKey", userTableInfo.getUSER_COURSES_KEY());
                Cookie isAdminCookie = new Cookie("isAdmin",Integer.toString(userTableInfo.getUSER_ISADMIN()));
                System.out.println(userTableInfo.toString());
                int cookieMaxAge = 3600;
                
                System.out.println("===========================2222222222");
                // System.out.println("쿠키 확인 = "+userIdCookie.getValue());
                // System.out.println("쿠키 확인 = "+userEmailCookie);
                // System.out.println("쿠키 확인 = "+userNicknameCookie);
                // 쿠키 만료 시간 설정 (예: 1시간)
                userIdCookie.setMaxAge(cookieMaxAge);
                userEmailCookie.setMaxAge(cookieMaxAge);
                userNicknameCookie.setMaxAge(cookieMaxAge);
                platformCookie.setMaxAge(cookieMaxAge);
                coursesKeyCookie.setMaxAge(cookieMaxAge);
                isAdminCookie.setMaxAge(cookieMaxAge);
                response.addCookie(userIdCookie);
                response.addCookie(userEmailCookie);
                response.addCookie(userNicknameCookie);
                response.addCookie(platformCookie);
                response.addCookie(coursesKeyCookie);
                response.addCookie(isAdminCookie);
                // 홈페이지로 보내고싶어양
                return "success";
            }
        }
        // 아이디가 중복이 아닐경우
        else {
            System.out.println("등록시 넘어옵니다");
            String USER_COURSES_KEY="0";
            int USER_ISADMIN =0;
            KakaoUserDTO newUser = new KakaoUserDTO(id, email, nickname, platform,USER_COURSES_KEY,USER_ISADMIN); // platform 변수 사용
            System.out.println(newUser);
            System.out.println("최초 등록시 dto  담기");
            System.out.println(newUser);
            if (kakaoMapper.RegUser(newUser) == 1) {
                System.out.println("Kakao 테이블 등록 성공");
            }
            Cookie userIdCookie = new Cookie("userId", id);
                Cookie userEmailCookie = new Cookie("userEmail", email);
                Cookie userNicknameCookie = new Cookie("userNickname", nickname);
                Cookie platformCookie = new Cookie("platform", platform);
                Cookie coursesKeyCookie = new Cookie("coursesKey",USER_COURSES_KEY);
                Cookie isAdminCookie = new Cookie("isAdmin",  Integer.toString(USER_ISADMIN));
                System.out.println("쿠키 확인 = "+userIdCookie);
                System.out.println("쿠키 확인 = "+userEmailCookie);
                System.out.println("쿠키 확인 = "+userNicknameCookie);

                // 쿠키 만료 시간 설정 (예: 1시간)
                int cookieMaxAge = 3600;
                userIdCookie.setMaxAge(cookieMaxAge);
                userEmailCookie.setMaxAge(cookieMaxAge);
                userNicknameCookie.setMaxAge(cookieMaxAge);
                platformCookie.setMaxAge(cookieMaxAge);
                coursesKeyCookie.setMaxAge(cookieMaxAge);
                isAdminCookie.setMaxAge(cookieMaxAge);
                response.addCookie(userIdCookie);
                response.addCookie(userEmailCookie);
                response.addCookie(userNicknameCookie);
                response.addCookie(platformCookie);
                response.addCookie(coursesKeyCookie);
                response.addCookie(isAdminCookie);


            return "success";
        }

    }

    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        System.out.println("clientId 확인 : " + clientId);
        System.out.println("clientSecret 확인 :" + clientSecret);
        System.out.println("redirectUri 확인 : " + redirectUri);
        System.out.println("tokenUri 확인 : " + tokenUri);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        System.out.println("entity 확인" + entity.getHeaders());
        System.out.println("entity 확인" + entity.getBody());

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity,
                JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();

        return accessTokenNode.get("access_token").asText();
    }
    

    public JsonNode getUserInfo(String accessToken, String registrationId) {
        String refresh_uri = env.getProperty("oauth2." + registrationId + ".refresh-token-uri");

        System.out.println("refresh_uri 확인 " + refresh_uri);
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        System.out.println("제이슨 확인");
        System.out.println("여기까진됐습니다");
        return  restTemplate.exchange(refresh_uri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }
}