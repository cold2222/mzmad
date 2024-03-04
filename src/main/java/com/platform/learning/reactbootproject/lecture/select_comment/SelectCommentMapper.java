package com.platform.learning.reactbootproject.lecture.select_comment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SelectCommentMapper {

    List<SelectCommentDTO> getComments(@Param("number") String number);
    
}