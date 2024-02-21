package com.platform.learning.reactbootproject.dy.login.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;


@Data
public class KakaoUserDTO {
	private String id;
	private String nickname;
	private String email;
    private String platform;
	private String USER_COURSES_KEY;
	private int USER_ISADMIN;

	public KakaoUserDTO(String id, String nickname, String email,String platform,String USER_COURSES_KEY,int USER_ISADMIN) {
		this.id = id;
		this.nickname = nickname;
		this.email = email;
        this.platform= platform;
        this.USER_COURSES_KEY= USER_COURSES_KEY;
        this.USER_ISADMIN = USER_ISADMIN;
	}
    
// JSON으로 변환하는 메서드
    public String toJsonString() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
