package com.platform.learning.reactbootproject.editor.communitydto;

import com.platform.learning.reactbootproject.dy.login.UserDTO;

import lombok.Data;

@Data
public class CommunityReCommentDTO {
	private int community_recomment_pk;
	private String community_recomment_user_pk;
	private int community_recomment_community_comment_pk;
	private String community_recomment_content;
	private String community_recomment_date;
	private UserDTO userDTO;
}
