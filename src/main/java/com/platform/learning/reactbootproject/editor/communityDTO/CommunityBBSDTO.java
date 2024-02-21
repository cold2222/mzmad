package com.platform.learning.reactbootproject.editor.communityDTO;

import lombok.Data;

@Data
public class CommunityBBSDTO {
    private String community_pk;
    private String user_pk;
    private String community_category;
    private String community_title;
    private String community_content;
    private String community_date;
    private String community_view;
    private String community_isgood;
    private String community_report;
    
}