package com.platform.learning.reactbootproject.dy.login.google;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class GoogleController {
    private final GoogleLoginService googleLoginService;

    @PostMapping("/oauth2/callback/google")
	   public ResponseEntity<String> kakaoLogin(HttpServletRequest req, @RequestParam String code, HttpSession httpsession,Model model,HttpServletResponse response) {
	    System.out.println("code 확인 : " + code);
		System.out.println("구글 컨트롤러");
	        
	      String googleResult =  googleLoginService.socialLogin(code,"google", httpsession,model, response);

	        System.out.println("구글 리절트"+googleResult);
	        
	    
	      if ("success".equals(googleResult)) {
			System.out.println(googleResult + "성공");
	    	  
				


	    	  	return ResponseEntity.ok("{\"result\": \"success\"}");
	        } else {
	        	
	            System.out.println(googleResult + "실패");
	        	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"result\": \"fail\"}");
	        }
	}


    
}
