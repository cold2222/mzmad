    package com.platform.learning.reactbootproject.dy.login.kakao;
    
    import com.platform.learning.reactbootproject.dy.login.UserDTO;
    import java.util.List;
    import org.apache.ibatis.annotations.Mapper;


    @Mapper
    public interface KakaoMapper {

        public int RegUser(UserDTO kakaoUserDTO);

        public List<UserDTO> SelUser(String id);

        public UserDTO selectUserTableInfo(String id);
    }
