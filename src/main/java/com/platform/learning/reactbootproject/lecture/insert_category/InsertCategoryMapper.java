package com.platform.learning.reactbootproject.lecture.insert_category;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InsertCategoryMapper {

    int insert_category(@Param("category") String category);
    
}
