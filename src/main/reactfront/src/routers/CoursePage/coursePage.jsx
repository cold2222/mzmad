// LecturePage.js

import React, { useState, useEffect } from 'react';
import styles from './css/LecturePage.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LecturePage = () => {
  const [category, setCategory] = useState('전체');
  const [unlockedVideos, setUnlockedVideos] = useState([]);  // 해금된 동영상 목록 추가
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleVideoClick = (uniqueNumber) => {
    navigate(`/course/${uniqueNumber}`);
  };

  const handleAdminRegistration = () => {
    navigate('/admin-registration');
  };

  const handleAccessDenied = (lectureId) => {
    const confirmKeyUsage = window.confirm("열쇠를 사용하시겠습니까?");
  
    if (confirmKeyUsage) {
      console.log('lectureId check' + lectureId)
      console.log('userId check' + sessionStorage.getItem('userId'))
      axios.post('/check-key-usage/' +  lectureId + '/' + sessionStorage.getItem('userId'))
        .then(response => {
          console.log(response)
          if (response.data === 'success') {
            toast("열쇠를 사용하셨습니다. ");
            setUnlockedVideos(prevVideos => [...prevVideos, lectureId]);  // 해금된 동영상 목록에 추가
          } else {
            console.log("열쇠 사용이 거부되었습니다.");
          }
        })
        .catch(error => {
          console.error('서버 통신 중 오류 발생:', error.message);
        });
    } else {
      console.log("열쇠 사용이 취소되었습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('/get-course-data/' + sessionStorage.getItem('userId'))
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
              <li key={lecture.courses_id} className={styles.item}>
                {unlockedVideos.includes(lecture.courses_id) || lecture.isAccessGranted === '1' ? (
                  <div
                    className={styles.videoContainer}
                    onClick={() => handleVideoClick(lecture.courses_id)}
                  >
                    <span>{lecture.courses_name}</span><br />
                    <video width="320" height="240">
                      <source src={`LectureVideo/${lecture.courses_video}`} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div
                    className={styles.videoContainer}
                    onClick={() => handleAccessDenied(lecture.courses_id)}
                  >
                    <span>{lecture.courses_name}</span><br />
                    <img
                      width="320"
                      height="200"
                      src="/img/lock.jpeg"  // 실제 오버레이 이미지의 경로로 대체하세요
                      alt="Overlay"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default LecturePage;
