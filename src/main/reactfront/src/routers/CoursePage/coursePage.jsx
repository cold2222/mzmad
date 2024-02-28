// LecturePage.js
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import styles from './css/LecturePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LecturePage = () => {
  const [category, setCategory] = useState('전체');
  const navigate = useNavigate();  // Navigation을 위한 history 객체 생성
  const [lectureData,setLectureData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  // 각 동영상의 고유 번호를 사용하여 개별 동영상 페이지로 이동
  const handleVideoClick = (uniqueNumber) => {

    navigate(`/course/${uniqueNumber}`);
  };

  const handleAdminRegistration = () => {
    navigate('/admin-registration');  // AdminRegistration 컴포넌트로 이동
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/get-course-data') // URL을 적절히 조정하세요.
      .then(response => {
        console.log(response)
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

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.adminButton} onClick={handleAdminRegistration}>
          관리자 등록
        </button>

        <label className={styles.label}>카테고리 선택</label>
        <select className={styles.select} value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="전체">전체</option>
          {uniqueCategories.map(categoryOption => (
            <option key={categoryOption} value={categoryOption}>{categoryOption}</option>
          ))}
        </select>
      </div><br/>

      <div>
        <h2 className={styles.title}>{category} 강의 목록</h2>
        {lectureData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <ul className={styles.list}>
              {filteredLectures.map(lecture => (
                <li key={lecture.courses_date} className={styles.item}>
                <div className = {styles.videoContainer} onClick={() => handleVideoClick(lecture.courses_id)}>
                  <span>{lecture.courses_name}</span><br/>
                  <video width="320" height="240">
                    <source src={`LectureVideo/${lecture.courses_video}`} type="video/mp4" />
                  </video>
                </div>
              </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

/*<ul className={styles.list}>
{filteredLectures.map(lecture => (
  <li key={lecture.courses_date} className={styles.item}>
    <span>{lecture.courses_name}</span><br/>
    <div className={styles.videoContainer} onClick={() => handleVideoClick(lecture.courses_id)}>
      {selectedVideo === lecture.uniqueNumber ? (
        <video width="320" height="240" controls>
          <source src={`LectureVideo/${lecture.courses_video}`} type="video/mp4" />
        </video>
      ) : (
        <div className={styles.blurOverlay}>
          <p>클릭하여 잠금 해제</p>
        </div>
      )}
    </div>
  </li>
))}
</ul>*/

export default LecturePage;
