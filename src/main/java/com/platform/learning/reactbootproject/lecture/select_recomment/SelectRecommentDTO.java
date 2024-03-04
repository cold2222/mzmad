package com.platform.learning.reactbootproject.lecture.select_recomment;

import lombok.Data;

@Data
public class SelectRecommentDTO {
    private String course_recomment_id;
    private String course_recomment_comment_id;
    private String course_recomment_user_id;
    private String course_recomment_content;
    private String course_recomment_date;
}
