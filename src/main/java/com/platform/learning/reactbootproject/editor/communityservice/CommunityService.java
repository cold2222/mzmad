package com.platform.learning.reactbootproject.editor.communityservice;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platform.learning.reactbootproject.editor.communitydto.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityCommentDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityIsGoodDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityReCommentDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityReportDTO;
import com.platform.learning.reactbootproject.editor.communitymapper.CommunityMapper;


@Service
public class CommunityService {
    
	@Autowired
    private CommunityMapper communityMapper;

    public void insertCommunity(CommunityBBSDTO bbsDTO){
        communityMapper.communityInsert(bbsDTO);
    }

    public List<CommunityBBSDTO> selectAllCommunity(String category, int currentPage) {
        if(category.equals("free")){
            category = "#자유게시판";
        }else if(category.equals("tip")){
            category ="#글쓰기Tip공유게시판";
        }else if(category.equals("assignment")){
            category = "#과제게시판";
        }else if(category.equals("portfolio")) {
        	category = "#포트폴리오게시판";
        }
        int limit = 10;
        int start_row = currentPage * limit;
        int end_row = start_row + limit;
        
        List<CommunityBBSDTO> bbsList = communityMapper.SelectMenuCommunity(category ,start_row, end_row);
        for (int i = 0; i < bbsList.size(); i++) {
			String content = bbsList.get(i).getCommunity_content();
			content = removeImgTags(content);
			bbsList.get(i).setCommunity_content_only(content);
		}
        
        return bbsList;
    }
    
    public int selectMenuCommunityTotalCount(String category) {
    	if(category.equals("free")){
            category = "#자유게시판";
        }else if(category.equals("tip")){
            category ="#글쓰기Tip공유게시판";
        }else if(category.equals("assignment")){
            category = "#과제게시판";
        }else if(category.equals("portfolio")) {
        	category = "#포트폴리오게시판";
        }
    	return communityMapper.selectMenuCommunityTotalCount(category);
    	
    }

    public CommunityBBSDTO communitySelectView(String community_pk) {
        
        return communityMapper.communitySelectView(community_pk);
    }

    public void updateViews(String community_pk) {
        communityMapper.updateViews(community_pk);
    }

    public void isGood(String community_pk) {
        communityMapper.isGood(community_pk);
    }

    public void report(String community_pk) {
        communityMapper.report(community_pk);
    }

    public void delete(String community_pk) {
        communityMapper.delete(community_pk);
    }

    public void update(CommunityBBSDTO communityBBSDTO) {
        communityMapper.update(communityBBSDTO);
    }

	public void insertComment(CommunityCommentDTO communityCommentDTO) {
		String community_comment_content = communityCommentDTO.getCommunity_comment_content();
		community_comment_content = community_comment_content.replace("\n", "<br>");
		communityCommentDTO.setCommunity_comment_content(community_comment_content);
		communityMapper.insertComment(communityCommentDTO);
		
	}

	public List<CommunityCommentDTO> getCommentsByCommunityId(int community_pk) {		
		
		return communityMapper.getCommentsByCommunityId(community_pk);
	}
	
	private static String removeImgTags(String input) {
        String pattern = "<(/p|p|br|img)[^>]*>";
        Pattern imgPattern = Pattern.compile(pattern);

        Matcher matcher = imgPattern.matcher(input);
        String result = matcher.replaceAll("");

        return result;
    }

	public String isGoodCheck(CommunityIsGoodDTO communityIsGood) {
		CommunityIsGoodDTO check = communityMapper.isGoodCheck(communityIsGood);
		if(check == null) {
			communityMapper.isGoodUserInsert(communityIsGood);
			return "false";
		}
		return "true";
	}

	public String reportCheck(CommunityReportDTO communityReportDTO) {
		CommunityReportDTO check = communityMapper.reportCheck(communityReportDTO);
		if(check == null) {
			communityMapper.reportUserInsert(communityReportDTO);
			return "false";
		}
		return "true";
	}

	public void deleteComment(String community_comment_pk) {
		communityMapper.deleteComment(community_comment_pk);
	}

	public void updateComment(CommunityCommentDTO communityCommentDTO) {
		String community_comment_content = communityCommentDTO.getCommunity_comment_content();
		community_comment_content = community_comment_content.replace("\n", "<br>");
		communityCommentDTO.setCommunity_comment_content(community_comment_content);
		communityMapper.updateComment(communityCommentDTO);
	}

	public void insertRecomment(CommunityReCommentDTO communityReCommentDTO) {
		communityMapper.insertRecomment(communityReCommentDTO);
	}

	public void deleteRecomment(String community_recomment_pk) {
		communityMapper.deleteRecomment(community_recomment_pk);
		
	}

	public void updateRecomment(CommunityReCommentDTO communityRecommentDTO) {
		String community_recomment_content = communityRecommentDTO.getCommunity_recomment_content();
		community_recomment_content = community_recomment_content.replace("\n", "<br>");
		communityRecommentDTO.setCommunity_recomment_content(community_recomment_content);
		communityMapper.updateRecomment(communityRecommentDTO);
		
	}
	
	
}
