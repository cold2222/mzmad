package com.platform.learning.reactbootproject.test;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestMapper testMapper;

    public List<TestDTO> getAllTest(){
        
        return testMapper.getAllTest();
    }
    
}
