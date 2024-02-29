package com.platform.learning.reactbootproject.dy.myPage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@RequestParam String pk,@RequestParam String nickname, @RequestParam MultipartFile profile) {
        try {
            System.out.println("넘어왔어요");
            myPageService.updateUser(pk,nickname, profile);
            return ResponseEntity.ok("회원 정보가 성공적으로 수정되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 수정 중 오류가 발생했습니다.");
        }
    }
}