package com.platform.learning.reactbootproject.editor.communityservice;

import java.util.List;

import org.springframework.stereotype.Service;

import com.platform.learning.reactbootproject.editor.communityDTO.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communitymapper.CommunityMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommunityService {
    
    private final CommunityMapper communityMapper;

    public void insertCommunity(CommunityBBSDTO bbsDTO){
        communityMapper.communityInsert(bbsDTO);
    }

    public List<CommunityBBSDTO> selectAllCommunity(String category) {
        if(category.equals("home")){
            category = "#home";
        }else if(category.equals("free")){
            category = "#자유게시판";
        }else if(category.equals("tip")){
            category ="#글쓰기Tip공유게시판";
        }else if(category.equals("assignment")){
            category = "#과제게시판";
        }
        
        if(category.equals("#home")){
            return communityMapper.selectAllCommunity();
        }
        return communityMapper.SelectMenuCommunity(category);
    }

    public CommunityBBSDTO communitySelectView(String community_pk) {
        
        return communityMapper.communitySelectView(community_pk);
    }
}
