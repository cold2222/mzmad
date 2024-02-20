package com.platform.learning.reactbootproject.lecture.insert_lecture;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class InsertLectureDTO {

    private String courses_category;
    private String courses_name;
    private MultipartFile courses_video;
    
}