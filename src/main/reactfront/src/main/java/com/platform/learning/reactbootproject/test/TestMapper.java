package com.platform.learning.reactbootproject.test;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestMapper {

    List<TestDTO> getAllTest();

    
}