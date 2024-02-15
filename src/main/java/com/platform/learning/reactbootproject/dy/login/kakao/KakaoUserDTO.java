package com.platform.learning.reactbootproject.dy.login.kakao;

import lombok.Data;


@Data
public class KakaoUserDTO {
	private String id;
	private String email;
	private String nickname;
    private String platform;

	public KakaoUserDTO(String id, String email, String nickname,String platform) {
		this.id = id;
		this.email = email;
		this.nickname = nickname;
        this.platform= platform;
	}

}
