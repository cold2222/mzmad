// LecturePage.js
import React, { useState, useEffect } from 'react';
import styles from './css/LecturePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LecturePage = () => {
  const [category, setCategory] = useState('전체');
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleVideoClick = (uniqueNumber) => {
    navigate(`/course/${uniqueNumber}`);
  };

  const handleAdminRegistration = () => {
    navigate('/admin-registration');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/get-course-data')
      .then(response => {
        setLectureData(response.data);
        extractUniqueCategories(response.data);
      })
      .catch(error => {
        console.error('데이터를 가져오는 데 실패했습니다:', error.message);
      });
  };

  const extractUniqueCategories = (data) => {
    const uniqueCategories = [...new Set(data.map(lecture => lecture.courses_category))];
    setUniqueCategories(uniqueCategories);
  };

  const filteredLectures = category === '전체'
    ? lectureData
    : lectureData.filter(lecture => lecture.courses_category === category);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.adminButton} onClick={handleAdminRegistration}>
          관리자 등록
        </button>

        <label className={styles.label}>강의목록 보기</label>
        <select className={styles.select} value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="전체">전체</option>
          {uniqueCategories.map(categoryOption => (
            <option key={categoryOption} value={categoryOption}>{categoryOption}</option>
          ))}
        </select>
      </div><br />

      <div>
        <h2 className={styles.title}>{category} 강의 목록</h2>
        {lectureData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
            {filteredLectures.map(lecture => (
              <li key={lecture.courses_date} className={styles.item}>
                <div
                  className={styles.videoContainer}
                  onClick={() => handleVideoClick(lecture.courses_id)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span>{lecture.courses_name}</span><br />
                  <video width="320" height="240">
                    <source src={`LectureVideo/${lecture.courses_video}`} type="video/mp4" />
                  </video>
                  {isMouseOver && (
                    <img
                      src="/img/lock.jpeg"// 실제 오버레이 이미지의 경로로 대체하세요
                      alt="Overlay"
                      className={styles.overlayImage}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LecturePage;
