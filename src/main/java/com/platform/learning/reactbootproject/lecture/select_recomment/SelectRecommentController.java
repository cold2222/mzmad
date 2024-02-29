package com.platform.learning.reactbootproject.lecture.select_recomment;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequiredArgsConstructor
public class SelectRecommentController {
    private final SelectRecommentService selectRecommentService;
    
    @GetMapping("/get-replies/{replyCommentId}")
    public ResponseEntity<List<SelectRecommentDTO>> getRecomments(@PathVariable("replyCommentId") String replyCommentId) {
        
        List<SelectRecommentDTO> getRecommentsList = selectRecommentService.getRecomments(replyCommentId);
        

        return new ResponseEntity<>(getRecommentsList, HttpStatus.OK);
    }
    
}
