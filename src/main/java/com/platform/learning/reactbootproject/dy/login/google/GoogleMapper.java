package com.platform.learning.reactbootproject.dy.login.google;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.dy.login.UserDTO;

@Mapper
public interface GoogleMapper {

        public int RegUser(UserDTO userDTO);

        public List<UserDTO> SelUser(String user_pk);

        public UserDTO selectUserTableInfo(String user_pk);
    
}
