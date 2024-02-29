package com.platform.learning.reactbootproject.lecture.insert_recomment;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsertRecommentService {
    private final InsertRecommentMapper insertRecommentMapper;

    public String regRecomment(InsertRecommentDTO insertRecommentDTO) {
        String currentTime = getCurrentTimeString();

        insertRecommentDTO.setCourse_recomment_date(currentTime);

        
        if(insertRecommentMapper.regRecomment(insertRecommentDTO)>=1)
        {
            System.out.println("리댓글 등록 성공");
            return "리댓글이 성공적으로 등록되었습니다.";
        }
        else{
            return "리댓글 등록 실패";
        }
        
    }
    
    private String getCurrentTimeString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(new Date());
    }
}
