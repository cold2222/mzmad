package com.platform.learning.reactbootproject.lecture.insert_comment;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InsertCommentMapper {

    int regCourseComment(InsertCommentDTO insertCommentDTO);
    
}
