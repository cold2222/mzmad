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

    @GetMapping("/get-course-data/{userId}")
    public ResponseEntity<List<SelectLectureDTO>> getAllLectures(@PathVariable("userId") String userId) {
        System.out.println("userId test " + userId);
        List<SelectLectureDTO> result = selectLectureService.getAllLectures();
    
        if (userId.equals("null")) {
            System.out.println("여기찍힘");
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            for(SelectLectureDTO s : result){
                s.setIsAccessGranted(selectLectureService.getIsAccessGranted(userId, s.getCourses_id()));
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }
    
    
    @GetMapping("/get-video-info/{number}")
    public ResponseEntity<SelectLectureDTO> getLecture(@PathVariable("number") String number) {

        SelectLectureDTO getVideoInfo = selectLectureService.getVideoInfo(number);
        
        return new ResponseEntity<>(getVideoInfo, HttpStatus.OK);
    }
    
    
}