package com.platform.learning.reactbootproject.dy.myPage;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.platform.learning.reactbootproject.dy.login.UserDTO;

@Mapper
public interface MyPageMapper {

    // 닉네임으로 사용자 정보 조회
    UserDTO findByPk(@Param("pk") String pk);

    // 사용자 정보 업데이트
    void updateUser(UserDTO user);

    // 프로필 사진 경로 업데이트
    void updateProfileUrl(UserDTO user);
}