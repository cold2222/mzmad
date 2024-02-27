package com.platform.learning.reactbootproject.editor.communityservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.platform.learning.reactbootproject.editor.communitydto.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communitymapper.CommunityMapper;

@Service
public class CommunityService {
    
	@Autowired
    private CommunityMapper communityMapper;

    public void insertCommunity(CommunityBBSDTO bbsDTO){
        System.out.println(bbsDTO);
        System.out.println("dto값 머들어감?");
        communityMapper.communityInsert(bbsDTO);
    }

    public List<CommunityBBSDTO> selectAllCommunity(String category) {
        if(category.equals("free")){
            category = "#자유게시판";
        }else if(category.equals("tip")){
            category ="#글쓰기Tip공유게시판";
        }else if(category.equals("assignment")){
            category = "#과제게시판";
        }
        return communityMapper.SelectMenuCommunity(category);
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
}
