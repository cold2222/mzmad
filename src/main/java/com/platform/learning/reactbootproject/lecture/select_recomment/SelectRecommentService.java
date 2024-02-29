package com.platform.learning.reactbootproject.lecture.select_recomment;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SelectRecommentService {

    private final SelectRecommentMapper selectRecommentMapper;

    public List<SelectRecommentDTO> getRecomments(String replyCommentId) {
        
        return selectRecommentMapper.getRecomments(replyCommentId);
    }
    
}
