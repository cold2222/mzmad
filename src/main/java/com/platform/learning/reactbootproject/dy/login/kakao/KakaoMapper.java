package com.platform.learning.reactbootproject.dy.login.kakao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.dy.login.UserDTO;

    @Mapper
    public interface KakaoMapper {

        public int RegUser(UserDTO userDTO);

        public List<UserDTO> SelUser(String USER_PK);

        public UserDTO selectUserTableInfo(String USER_PK);
    }
