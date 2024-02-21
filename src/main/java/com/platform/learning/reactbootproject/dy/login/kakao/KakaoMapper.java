    package com.platform.learning.reactbootproject.dy.login.kakao;

    import java.util.List;

    import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.dy.login.UserDTO;

    @Mapper
    public interface KakaoMapper {

        int RegUser(UserDTO UserDTO);

        List<UserDTO> SelUser(String USER_PK);

        UserDTO selectUserTableInfo(String USER_PK);
    }
