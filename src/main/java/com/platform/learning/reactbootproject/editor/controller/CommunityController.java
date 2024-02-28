package com.platform.learning.reactbootproject.editor.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.platform.learning.reactbootproject.editor.communitydto.CommunityBBSDTO;
import com.platform.learning.reactbootproject.editor.communitydto.CommunityCommentDTO;
import com.platform.learning.reactbootproject.editor.communityservice.CommunityService;

import lombok.RequiredArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@RestController
@RequestMapping("/community")
public class CommunityController {

	private final CommunityService communityservice;

	@PostMapping("/insert")
	public void communityInsert(@RequestBody CommunityBBSDTO bbsDTO) {
		if (bbsDTO.getCommunity_user_pk() == null) {
			bbsDTO.setCommunity_user_pk("비회원");
		}

		communityservice.insertCommunity(bbsDTO);
	}

	@GetMapping("/selectAll/{category}")
	public List<CommunityBBSDTO> communitySelectAll(@PathVariable String category) {
		System.out.println("검색한 목록 :" + category);

		return communityservice.selectAllCommunity(category);
	}

	@GetMapping("/view/{community_pk}")
	public CommunityBBSDTO communitySelectView(@PathVariable String community_pk) {
		System.out.println("검색한 목록(view) :" + community_pk);
		communityservice.updateViews(community_pk);
		return communityservice.communitySelectView(community_pk);
	}

	@SuppressWarnings("null")
	@PostMapping("/image")
	public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
		try {
			// 이미지를 저장할 디렉토리 경로 설정
			String uploadDir = "C:\\coding\\React\\reactbootproject\\src\\main\\reactfront\\public\\UploadImage";
			// 파일에 uuid 부여
			String fileRealName = image.getOriginalFilename();
			String fileExtension = fileRealName.substring(fileRealName.lastIndexOf("."), fileRealName.length());
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
			String imageUrl = "/UploadImage/" + uniqueName + fileExtension;
			// JSON 형식으로 반환
			String responseBody = "{\"imageUrl\": \"" + imageUrl + "\"}";

			System.out.println(imageUrl);
			System.out.println("이미지 url입니다@@@@@@@@@@@");
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(responseBody);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).contentType(MediaType.TEXT_PLAIN)
					.body("Failed to upload image");
		}
	}

	@PutMapping("/isgood")
	public void isGood(@RequestBody String community_pk) {
		System.out.println("좋아요 누르기 pk" + community_pk);
		communityservice.isGood(community_pk);
	}

	@PutMapping("/report")
	public void report(@RequestBody String community_pk) {
		System.out.println("신고하기 pk" + community_pk);
		communityservice.report(community_pk);
	}

	@DeleteMapping("/delete")
	public void delete(@RequestBody String community_pk) {
		System.out.println("삭제할 게시글 pk" + community_pk);
		communityservice.delete(community_pk);
	}

	@PutMapping("/update")
	public void update(@RequestBody CommunityBBSDTO communityBBSDTO) {
		System.out.println("업데이트할 DTO  :" + communityBBSDTO);
		communityservice.update(communityBBSDTO);
	}

	@PostMapping("/insertComment")
	public void insertComment(@RequestBody CommunityCommentDTO communityCommentDTO) {
		communityservice.insertComment(communityCommentDTO);
		System.out.println("코멘트 저장 성공");
	}

}
