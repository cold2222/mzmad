package com.platform.learning.reactbootproject.lecture.insert_lecture;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsertLectureService {

    private final InsertLectureMapper insertLectureMapper;

    public String registerLecture(InsertLectureDTO insertLectureDTO) {
        try {
            MultipartFile file = insertLectureDTO.getCourses_video();
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = generateUniqueFilename(fileExtension);
    
            // 경로 설정
            Path directoryPath = Paths.get("src/main/resources/static/LectureVideo/");
            Files.createDirectories(directoryPath);
    
            Path filePath = Paths.get(directoryPath.toString(), newFilename);
    
            // 동일한 파일명이 이미 존재하는지 확인
            if (Files.exists(filePath)) {
                // 파일명이 중복되는 경우 새로운 파일명 생성
                newFilename = generateUniqueFilename(fileExtension);
                filePath = Paths.get(directoryPath.toString(), newFilename);
            }
    
            // 파일 복사
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    
            String category = insertLectureDTO.getCourses_category();
            String lectureName = insertLectureDTO.getCourses_name();
    
            // 데이터베이스에 저장
            saveLectureToDatabase(category, lectureName, newFilename);
    
            return "강의가 성공적으로 등록되었습니다!";
        } catch (IOException e) {
            e.printStackTrace();
            return "강의 등록 중 오류 발생: " + e.getMessage();
        }
    }
    

    private String generateUniqueFilename(String fileExtension) {
        String uuid = UUID.randomUUID().toString();
        return uuid + fileExtension;
    }

    private void saveLectureToDatabase(String category, String lectureName, String filename) {
        String currentTime = getCurrentTimeString();

        if(insertLectureMapper.saveLecture(category,lectureName,filename,currentTime)>=1){
            System.out.println("강의 등록 완료");
        }
    }

    private String getCurrentTimeString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(new Date());
    }
}

