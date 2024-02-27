package com.platform.learning.reactbootproject.editor.communitymapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.platform.learning.reactbootproject.editor.communitydto.CommunityBBSDTO;

@Mapper
public interface CommunityMapper {

    
    public void communityInsert(CommunityBBSDTO bbsDTO);

    public List<CommunityBBSDTO> SelectMenuCommunity(String category);
    
    public CommunityBBSDTO communitySelectView(String community_pk);

    public void updateViews(String community_pk);

    public void isGood(String community_pk);

    public  void report(String community_pk);

    public  void delete(String community_pk);

    public  void update(CommunityBBSDTO communityBBSDTO);
}