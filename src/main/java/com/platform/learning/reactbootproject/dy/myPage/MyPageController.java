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

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestParam String pk,@RequestParam String nickname, @RequestParam MultipartFile profile) {
        try {
            System.out.println("넘어왔어요");

            myPageService.updateUser(pk,nickname, profile);
            System.out.println("다했지요~");
            return ResponseEntity.ok("success");    
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String user_pk) {
        try {
            System.out.println("삭제 요청 받음");

            // userId를 사용하여 사용자를 삭제하는 로직을 호출합니다.
            myPageService.deleteUser(user_pk);
            
            System.out.println("사용자 삭제 완료");
            return ResponseEntity.ok("success");    
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("fail");
        }
    }



    
}