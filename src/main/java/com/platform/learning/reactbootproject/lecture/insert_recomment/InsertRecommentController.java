package com.platform.learning.reactbootproject.lecture.insert_recomment;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
public class InsertRecommentController {
    private final InsertRecommentService insertRecommentService;

    @PostMapping("/submit-reply")
    public String regRecomment(@RequestBody InsertRecommentDTO insertRecommentDTO) {
        
        return insertRecommentService.regRecomment(insertRecommentDTO);
    }
    
}
