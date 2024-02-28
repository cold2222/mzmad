package com.platform.learning.reactbootproject.editor.communitydto;

import lombok.Data;

@Data
public class CommunityCommentDTO {
	private int community_comment_pk;
    private String community_comment_user_pk;
    private int community_comment_community_pk;
    private String community_comment_content;
    private String community_comment_date;
    private int community_comment_isgood;
}
