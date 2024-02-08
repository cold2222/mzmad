package com.platform.learning.reactbootproject.test;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping("/test")
    public String apiTest(){
        System.out.println("이거보임?");
        return "보임?";
    }

    @GetMapping("/api/bbsApi")
    public List<TestDTO> bbsApi(){
        
        List<TestDTO> testList = testService.getAllTest();

        return testList;

    }
}