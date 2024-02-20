package com.platform.learning.reactbootproject.lecture.insert_category;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsertCategoryService {

    private final InsertCategoryMapper insertCategoryMapper;

    public void insert_category(String category) {
        if(insertCategoryMapper.insert_category(category)>=1){
            System.out.println("Category 등록 성공");
        }
    }
    
}
