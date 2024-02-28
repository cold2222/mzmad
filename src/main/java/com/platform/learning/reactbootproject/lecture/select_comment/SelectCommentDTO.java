package com.platform.learning.reactbootproject.lecture.select_comment;

import lombok.Data;

@Data
public class SelectCommentDTO {
    private String course_comment_id;
    private String course_comment_user_id;
    private String course_comment_course_id;
    private String course_comment_content;
    private String course_comment_date;
}
