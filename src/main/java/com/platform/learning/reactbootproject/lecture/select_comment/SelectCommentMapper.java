package com.platform.learning.reactbootproject.lecture.select_comment;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SelectCommentMapper {

    List<SelectCommentDTO> getComments(String number);
    
}