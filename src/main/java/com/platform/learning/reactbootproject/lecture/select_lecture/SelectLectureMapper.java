package com.platform.learning.reactbootproject.lecture.select_lecture;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SelectLectureMapper {

    List<SelectLectureDTO> getAllLectures();
    
}
