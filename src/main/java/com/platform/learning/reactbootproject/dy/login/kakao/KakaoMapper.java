    package com.platform.learning.reactbootproject.dy.login.kakao;

    import java.util.List;

    import org.apache.ibatis.annotations.Mapper;

    @Mapper
    public interface KakaoMapper {

        public int RegUser(KakaoUserDTO kakaoUserDTO);

        public List<KakaoUserDTO> SelUser(String id);

        public KakaoUserDTO selectUserTableInfo(String id);
    }
