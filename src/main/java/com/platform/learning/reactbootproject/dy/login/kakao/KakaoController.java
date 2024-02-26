package com.platform.learning.reactbootproject.dy.login.kakao;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value = "/login", produces = "application/json")
public class KakaoController {
	private final KakaoLoginService kakaoLoginService;
	
	
	@PostMapping("/oauth2/callback/kakao")
	   public ResponseEntity<String> kakaoLogin(HttpServletRequest req, @RequestParam String code, HttpSession httpsession,Model model,HttpServletResponse response) {
	    System.out.println("code 확인 : " + code);
		System.out.println("카카오컨트롤러");
	        
	      String kakaoResult =  kakaoLoginService.socialLogin(code,"kakao", httpsession,model, response);

	        System.out.println("카카오리절트"+kakaoResult);
	        
	    
	      if ("success".equals(kakaoResult)) {
			System.out.println(kakaoResult + "성공");
	    	  
				


	    	  	return ResponseEntity.ok("{\"result\": \"success\"}");
	        } else {
	        	
	            System.out.println(kakaoResult + "실패");
	        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"result\": \"fail\"}");
	        }
	}

}