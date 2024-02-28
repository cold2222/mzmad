package com.platform.learning.reactbootproject.lecture.select_lecture;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface SelectLectureMapper {

    List<SelectLectureDTO> getAllLectures();

    SelectLectureDTO getVideoInfo(@Param("number") String number);
    
}
