package com.platform.learning.reactbootproject.lecture.insert_recomment;

import lombok.Data;

@Data
public class InsertRecommentDTO {
    private String course_recomment_comment_id;
    private String course_recomment_user_id;
    private String course_recomment_content;
    private String course_recomment_date;
}
