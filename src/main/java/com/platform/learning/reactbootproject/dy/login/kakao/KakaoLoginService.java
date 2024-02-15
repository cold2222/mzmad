package com.platform.learning.reactbootproject.dy.login.kakao;

import java.net.http.HttpHeaders;
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
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    private final KakaoMapper kakaoMapper;
    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    

    public String socialLogin(String code, String registrationId, HttpSession session, Model model) {
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
        
        System.out.println("여기안되용");

        if (existingUsers.size()==1) {
            
            System.out.println("이미 있는 아이디입니다.");

            // 이미 존재하는 사용자에 대한 추가 작업 수행

            if (Objects.isNull(kakaoMapper.selectUserTableInfo(email))) {

                session.setAttribute("userId", id);
                session.setAttribute("userEmail", email);
                session.setAttribute("userNickname", nickname);
                session.setAttribute("platform", registrationId);
                session.setAttribute("accessToken", accessToken);
                session.setMaxInactiveInterval(3600);

                return "suceess";

            } else {
                KakaoUserDTO userTableInfo = kakaoMapper.selectUserTableInfo(email);

                session.setAttribute("userId", id);
                session.setAttribute("userEmail", userTableInfo.getEmail());
                session.setAttribute("userNickname", userTableInfo.getNickname());
                session.setAttribute("platform", registrationId);
                session.setAttribute("accessToken", accessToken);
                session.setMaxInactiveInterval(3600);

                // 홈페이지로 보내고싶어양
                return "success";
            }
        }
        // 아이디가 중복이 아닐경우
        else {
            KakaoUserDTO newUser = new KakaoUserDTO(id, email, nickname, platform); // platform 변수 사용

            if (kakaoMapper.RegUser(newUser) == 1) {
                System.out.println("Kakao 테이블 등록 성공");
            }
            session.setAttribute("userId", id);
            session.setAttribute("userEmail", email);
            session.setAttribute("userNickname", nickname);
            session.setAttribute("platform", registrationId);
            session.setAttribute("accessToken", accessToken);
            session.setMaxInactiveInterval(3600);

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