package com.platform.learning.reactbootproject.lecture.insert_comment;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsertCommentService {

    private final InsertCommentMapper insertCommentMapper;

    public String regCourseComment(InsertCommentDTO insertCommentDTO) {

        String currentTime = getCurrentTimeString();

        insertCommentDTO.setCourse_comment_date(currentTime);

        
        if(insertCommentMapper.regCourseComment(insertCommentDTO)>=1)
        {
            System.out.println("댓글 등록 성공");
            return "댓글이 성공적으로 등록되었습니다.";
        }
        else{
            return "댓글 등록 실패";
        }
    }


    
    private String getCurrentTimeString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(new Date());
    }
    
}
