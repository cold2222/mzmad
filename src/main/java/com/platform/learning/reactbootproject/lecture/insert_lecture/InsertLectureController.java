package com.platform.learning.reactbootproject.lecture.insert_lecture;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
public class InsertLectureController {

    private final InsertLectureService insertLectureService;
    
    @PostMapping("/lecture-registration")
    public String regLecture(InsertLectureDTO insertLectureDTO) {
        
        return insertLectureService.registerLecture(insertLectureDTO);
    }
    
}
