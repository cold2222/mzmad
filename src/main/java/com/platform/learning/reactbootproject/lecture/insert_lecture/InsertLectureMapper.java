package com.platform.learning.reactbootproject.lecture.insert_lecture;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InsertLectureMapper {

    int saveLecture(@Param("category")String category,
                    @Param("lectureName")String lectureName, 
                    @Param("filename")String filename, 
                    @Param("currentTime")String currentTime);
    
}
