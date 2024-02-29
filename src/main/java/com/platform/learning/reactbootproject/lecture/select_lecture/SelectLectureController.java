package com.platform.learning.reactbootproject.lecture.select_lecture;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequiredArgsConstructor
public class SelectLectureController {
    private final SelectLectureService selectLectureService;

    @GetMapping("/get-course-data")
    public ResponseEntity<List<SelectLectureDTO>> getAllLectures() {
        
        List<SelectLectureDTO> result = selectLectureService.getAllLectures();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    @GetMapping("/get-video-info/{number}")
    public ResponseEntity<SelectLectureDTO> getLecture(@PathVariable("number") String number) {

        SelectLectureDTO getVideoInfo = selectLectureService.getVideoInfo(number);
        
        return new ResponseEntity<>(getVideoInfo, HttpStatus.OK);
    }
    
    
}