package com.platform.learning.reactbootproject.lecture.select_comment;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class SelectCommentService {

    private final SelectCommentMapper selectCommentMapper;

    public List<SelectCommentDTO> getComments(String number) {

        return selectCommentMapper.getComments(number);
    }
    
}
