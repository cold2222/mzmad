package com.platform.learning.reactbootproject.lecture.select_category;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SelectCategoryService {
    
    private final SelectCategoryMapper selectCategoryMapper;

    public List<SelectCategoryDTO> getAllCategories() {
        return selectCategoryMapper.getAllCategories();
    }
    
}
