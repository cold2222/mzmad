package com.platform.learning.reactbootproject.lecture.insert_comment;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
public class InsertCommentController {

    private final InsertCommentService insertCommentService;

    @PostMapping("/submit-comment")
    public String regCourseComment(@RequestBody InsertCommentDTO insertCommentDTO) {
        
        return insertCommentService.regCourseComment(insertCommentDTO);
    }
    
    
}