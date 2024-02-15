package com.platform.learning.reactbootproject.editor.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.platform.learning.reactbootproject.editor.communityDTO.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communityservice.CommunityService;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequiredArgsConstructor
@RestController
@RequestMapping("/community")
public class CommunityController {

    private final CommunityService communityservice;

    @PostMapping("/insert")
    public void communityInsert(@RequestBody CommunityBBSDTO bbsDTO){
        communityservice.insertCommunity(bbsDTO);
    }
    @GetMapping("/selectAll")
    public List<CommunityBBSDTO> communitySelectAll(){
        System.out.println("여기 들어오긴함?");
        List<CommunityBBSDTO> bbsList = communityservice.selectAllCommunity();
        for(int i=0; i<bbsList.size(); i++){
            System.out.println(bbsList.get(i).getTitle());
        }
        return bbsList;
    }

    @SuppressWarnings("null")
    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            // 이미지를 저장할 디렉토리 경로 설정
            String uploadDir = "C:\\coding\\React\\reactbootproject\\src\\main\\reactfront\\public\\UploadImage";
            // 파일에 uuid 부여
            String fileRealName = image.getOriginalFilename();
            String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."),fileRealName.length());
            UUID uuid = UUID.randomUUID();
            String[] uuids = uuid.toString().split("-");
            String uniqueName = uuids[0];

            // 파일의 실제 저장 경로 설정
            String filePath = uploadDir + File.separator + uniqueName + fileExtension;
            // 이미지를 저장할 파일 생성
            File dest = new File(filePath);
            // 이미지 파일 저장
            image.transferTo(dest);
            // 저장된 이미지의 URL 반환
            String imageUrl = "../UploadImage/" + uniqueName + fileExtension;
            // JSON 형식으로 반환
            String responseBody = "{\"imageUrl\": \"" + imageUrl + "\"}";

            System.out.println(imageUrl);
            System.out.println("이미지 url입니다@@@@@@@@@@@");
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_PLAIN)
                    .body("Failed to upload image");
        }
    }
}
