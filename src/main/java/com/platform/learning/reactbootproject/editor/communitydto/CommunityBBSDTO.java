package com.platform.learning.reactbootproject.editor.communitydto;

import com.platform.learning.reactbootproject.dy.login.UserDTO;
import lombok.Data;

@Data
public class CommunityBBSDTO {
    private int community_pk;
    private String community_user_pk;
    private String community_category;
    private String community_title;
    private String community_content;
    private int community_view;
    private int community_isgood;
    private int community_report;
    private UserDTO userDTO;
    private String community_content_only;
    private String community_date;
    private int community_rn;
    
}