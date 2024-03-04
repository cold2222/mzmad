package com.platform.learning.reactbootproject.lecture.update_key;

import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
public class UpdateKeyController {
    private final UpdateKeyService updateKeyService;

    @PostMapping("/check-key-usage/{courseId}/{userId}")
    public String postMethodName(@PathVariable("courseId") String courseId, @PathVariable("userId") String userId) {

        updateKeyService.updateIsAccess(courseId, userId);

        return "success";
    }
    

    
}