package com.platform.learning.reactbootproject.lecture.select_lecture;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SelectLectureService {
    private final SelectLectureMapper selectLectureMapper;

    public List<SelectLectureDTO> getAllLectures() {
        
        return selectLectureMapper.getAllLectures();
    }

    public SelectLectureDTO getVideoInfo(String number) {

        return selectLectureMapper.getVideoInfo(number);
    }

}
