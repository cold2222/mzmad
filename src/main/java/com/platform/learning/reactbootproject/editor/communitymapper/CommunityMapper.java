package com.platform.learning.reactbootproject.editor.communitymapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.editor.communitydto.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityCommentDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityIsGoodDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityReCommentDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityReportDTO;

@Mapper
public interface CommunityMapper {

    
    public void communityInsert(CommunityBBSDTO bbsDTO);

    public List<CommunityBBSDTO> SelectMenuCommunity(String category, int start_row, int end_row, String search, String searchCondition);
    
    public int selectMenuCommunityTotalCount(String category, String search, String searchCondition);
    
    public CommunityBBSDTO communitySelectView(String community_pk);

    public void updateViews(String community_pk);

    public void isGood(String community_pk);

    public void report(String community_pk);

    public void delete(String community_pk);

    public void update(CommunityBBSDTO communityBBSDTO);

	public void insertComment(CommunityCommentDTO communityCommentDTO);

	public List<CommunityCommentDTO> getCommentsByCommunityId(int community_pk);

	public CommunityIsGoodDTO isGoodCheck(CommunityIsGoodDTO communityIsGood);
	
	public void isGoodUserInsert(CommunityIsGoodDTO communityIsGood);

	public CommunityReportDTO reportCheck(CommunityReportDTO communityReportDTO);

	public void reportUserInsert(CommunityReportDTO communityReportDTO);

	public void deleteComment(String community_comment_pk);

	public void updateComment(CommunityCommentDTO communityCommentDTO);

	public void insertRecomment(CommunityReCommentDTO communityReCommentDTO);

	public void deleteRecomment(String community_recomment_pk);

	public void updateRecomment(CommunityReCommentDTO communityRecommentDTO);
	
}