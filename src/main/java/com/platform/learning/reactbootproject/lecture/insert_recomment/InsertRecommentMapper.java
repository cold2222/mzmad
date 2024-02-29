package com.platform.learning.reactbootproject.lecture.insert_recomment;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InsertRecommentMapper {

    int regRecomment(InsertRecommentDTO insertRecommentDTO);
    
}
