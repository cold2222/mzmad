package com.platform.learning.reactbootproject.lecture.insert_category;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class InsertCategoryController {

    private final InsertCategoryService insertCategoryService;

    @GetMapping("/insert-category")
    public ResponseEntity<String> insertCategory(@RequestParam String category) {
        insertCategoryService.insert_category(category);

        return ResponseEntity.ok("카테고리가 성공적으로 등록되었습니다!");
    }
}
