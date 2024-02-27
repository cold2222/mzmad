package com.platform.learning.reactbootproject.dy.login;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;


@Data
public class UserDTO {
	private String user_pk;
	private String user_nickname;
	private String user_email;
    private String user_platform;
	private String user_courses_key;
	private int user_isAdmin;
	private String user_profile;

	public UserDTO(String user_pk, String user_nickname, String user_email, String user_platform,String user_courses_key, int user_isAdmin, String user_profile) {
		this.user_pk = user_pk;
		this.user_nickname = user_nickname;
		this.user_email = user_email;
		this.user_platform = user_platform;
		this.user_courses_key = user_courses_key;
		this.user_isAdmin = user_isAdmin;
		this.user_profile = user_profile;
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
