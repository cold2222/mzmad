package com.platform.learning.reactbootproject.dy.login;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;


@Data
public class UserDTO {
	private String USER_PK;
	private String USER_NICKNAME;
	private String USER_EMAIL;
    private String USER_PLATFORM;
	private String USER_COURSES_KEY;
	private int USER_ISADMIN;
    private String USER_PROFILE;

	public UserDTO(String USER_PK, String USER_NICKNAME, String USER_EMAIL,String USER_PLATFORM,String USER_COURSES_KEY,int USER_ISADMIN,String USER_PROFILE) {
		this.USER_PK = USER_PK;
		this.USER_NICKNAME = USER_NICKNAME;
		this.USER_EMAIL = USER_EMAIL;
        this.USER_PLATFORM = USER_PLATFORM;
        this.USER_COURSES_KEY= USER_COURSES_KEY;
        this.USER_ISADMIN = USER_ISADMIN;
        this.USER_PROFILE = USER_PROFILE;
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
