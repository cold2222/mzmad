package com.platform.learning.reactbootproject.dy.myPage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.platform.learning.reactbootproject.dy.login.UserDTO;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;
import java.nio.file.StandardCopyOption;

@Service
public class MyPageService {

    @Autowired
    private MyPageMapper myPageMapper; 

    // 사용자 정보 업데이트 및 파일 업로드 메서드
    public void updateUser(String pk, String nickname, MultipartFile profile) throws IOException {

        // 사용자 정보 업데이트
        UserDTO user = myPageMapper.findByPk(pk);
        if (user == null) {
            throw new RuntimeException("해당 사용자를 찾을 수 없습니다: " + pk);
        }
    
        // 닉네임 업데이트
        user.setUser_nickname(nickname);
        myPageMapper.updateUser(user);
    
        // 프로필 사진 업로드
        if (profile != null && !profile.isEmpty()) {
            String uploadDir = "src/main/reactfront/public/ProfileImg/";
            Path directoryPath = Paths.get(uploadDir);
            Files.createDirectories(directoryPath);
    
            String fileName = profile.getOriginalFilename();
            String filePath = directoryPath.resolve(fileName).toString();
    
            // 파일 저장
            Files.copy(profile.getInputStream(), directoryPath.resolve(fileName),StandardCopyOption.REPLACE_EXISTING);
    
            // 사용자의 프로필 사진 경로를 업데이트
            user.setUser_profile(filePath.replace("\\", "/"));
            myPageMapper.updateProfileUrl(user);
        }
    }
}