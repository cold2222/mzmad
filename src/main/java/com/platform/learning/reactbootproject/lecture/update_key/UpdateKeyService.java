package com.platform.learning.reactbootproject.lecture.update_key;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateKeyService {
    private final UpdateKeyMapper updateKeyMapper;

    public void updateIsAccess(String courseId, String userId) {
        
        if(updateKeyMapper.updateIsAccess(courseId, userId)>=1){
            System.out.println("courses_access Table update success");
        }
    }
    
}
