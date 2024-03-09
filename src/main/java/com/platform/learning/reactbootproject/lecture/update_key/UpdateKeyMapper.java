package com.platform.learning.reactbootproject.lecture.update_key;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UpdateKeyMapper {

    int updateIsAccess(@Param("courseId") String courseId, @Param("userId") String userId);
    
}
