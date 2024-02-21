package com.platform.learning.reactbootproject.editor.communitymapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.editor.communityDTO.CommunityBBSDTO;

@Mapper
public interface CommunityMapper {

    void communityInsert(CommunityBBSDTO bbsDTO);

    List<CommunityBBSDTO> selectAllCommunity();

    List<CommunityBBSDTO> SelectMenuCommunity(String category);

    CommunityBBSDTO communitySelectView(String community_pk);

    void updateViews(String community_pk);

    void isGood(String community_pk);

    void report(String community_pk);

    void delete(String community_pk);

    void update(CommunityBBSDTO communityBBSDTO);
}