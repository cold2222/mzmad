package com.platform.learning.reactbootproject.lecture.select_category;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SelectCategoryController {

    private final SelectCategoryService selectCategoryService;
    
    @GetMapping("/get-category-list")
    public List<SelectCategoryDTO> getCategoryList() {
        // 여기에서 카테고리 목록을 가져오는 로직을 수행
        List<SelectCategoryDTO> categoryList = selectCategoryService.getAllCategories();
        return categoryList;
    }
}
