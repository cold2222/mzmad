package com.platform.learning.reactbootproject.editor.communitymapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.editor.communityDTO.CommunityBBSDTO;

@Mapper
public interface CommunityMapper {

    void communityInsert(CommunityBBSDTO bbsDTO);

    List<CommunityBBSDTO> selectAllCommunity();
}