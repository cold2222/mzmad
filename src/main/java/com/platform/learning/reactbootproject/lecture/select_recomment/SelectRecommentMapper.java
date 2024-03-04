package com.platform.learning.reactbootproject.lecture.select_recomment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SelectRecommentMapper {

    List<SelectRecommentDTO> getRecomments(@Param("relpyCommentId") String replyCommentId);
    
}
