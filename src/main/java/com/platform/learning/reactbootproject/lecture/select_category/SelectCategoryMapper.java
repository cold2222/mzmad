package com.platform.learning.reactbootproject.lecture.select_category;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SelectCategoryMapper {

    List<SelectCategoryDTO> getAllCategories();
    
}
