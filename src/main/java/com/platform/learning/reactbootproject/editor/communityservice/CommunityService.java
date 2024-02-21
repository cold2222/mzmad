package com.platform.learning.reactbootproject.editor.communityservice;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
        
        CommunityBBSDTO bbsDTO = communityMapper.communitySelectView(community_pk);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
           Date date = dateFormat.parse(bbsDTO.getCommunity_date());
           bbsDTO.setCommunity_date(dateFormat.format(date));
        } catch (ParseException e) {
            System.out.println("디테일view페이지 데이터 변환 에러");
            e.printStackTrace();
        }

        return bbsDTO;
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
