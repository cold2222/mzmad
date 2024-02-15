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

    public List<CommunityBBSDTO> selectAllCommunity() {
        return communityMapper.selectAllCommunity();
    }
}
