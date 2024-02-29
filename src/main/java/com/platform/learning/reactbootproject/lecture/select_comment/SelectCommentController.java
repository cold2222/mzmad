package com.platform.learning.reactbootproject.lecture.select_comment;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequiredArgsConstructor
public class SelectCommentController {

    private final SelectCommentService selectCommentService;
    
    @GetMapping("/get-comments/{number}")
    public ResponseEntity<List<SelectCommentDTO>> getComments(@PathVariable("number") String number) {

        List <SelectCommentDTO> getCommentsList = selectCommentService.getComments(number);

        /*for(SelectCommentDTO selectCommentDTO : result){
            System.out.println(selectCommentDTO);
        }*/

        return new ResponseEntity<>(getCommentsList, HttpStatus.OK);
    }
    
}
