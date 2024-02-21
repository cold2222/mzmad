package com.platform.learning.reactbootproject.editor.communityDTO;

import com.platform.learning.reactbootproject.dy.login.kakao.KakaoUserDTO;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommunityBBSDTO {
    private int community_pk;
    private String user_pk;
    private String community_category;
    private String community_title;
    private String community_content;
    private LocalDateTime community_date;
    private int community_view;
    private int community_isgood;
    private int community_report;
    private KakaoUserDTO userDTO;
    
}