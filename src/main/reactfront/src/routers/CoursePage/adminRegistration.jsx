// AdminRegistration.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminRegistration.module.css';

const AdminRegistration = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [insertCategory, setInsertCategory] = useState('');
  const [lectureName, setLectureName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [categoryList, setCategoryList] = useState([]); //카테고리 항목 가져오는부분

  useEffect(() => {
    // selectedCategory가 변경될 때의 처리
    console.log('selectedCategory가 변경되었습니다.', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log('category 등록 테스트', insertCategory);
  }, [insertCategory]);

  useEffect(() => {
    // lectureName이 변경될 때의 처리
    console.log('lectureName이 변경되었습니다.', lectureName);
  }, [lectureName]);

  useEffect(() => {
    // videoFile이 변경될 때의 처리
    console.log('videoFile이 변경되었습니다.', videoFile);
  }, [videoFile]);
  
  useEffect(() => {
    // 카테고리 목록을 서버에서 가져오는 부분
    fetchCategoryList();
  }, []); 

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get('/get-category-list');
      // 응답 데이터가 category_name 키를 가진 객체들의 배열로 가정합니다.
      const categories = response.data.map(category => category.category_name);
      setCategoryList(categories);
    } catch (error) {
      console.error('카테고리 목록을 가져오는 중 오류 발생:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleInsertCategory = async () => {
    try {
      await axios.get('/insert-category', {
        params: {
          category: insertCategory,
        },
      });

      // 선택한 카테고리 초기화 혹은 다른 동작 수행 (선택사항)
      setInsertCategory('');

      console.log('카테고리가 성공적으로 등록되었습니다!');

      //목록 갱신
      fetchCategoryList();
    } catch (error) {
      console.error('카테고리 등록 중 오류 발생:', error);
    }
  };

  const handleLectureNameChange = (event) => {
    setLectureName(event.target.value);
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleLectureRegistration = async () => {
    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('lectureName', lectureName);
    formData.append('videoFile', videoFile);

    try {
      await axios.post('/admin-registration', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 입력 필드 초기화 혹은 다른 동작 수행 (선택사항)
      setSelectedCategory('');
      setLectureName('');
      setVideoFile(null);

      console.log('강의가 성공적으로 등록되었습니다!');
    } catch (error) {
      console.error('강의 등록 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>관리자 등록 페이지</h2>
      <br/>
      <label className={styles.label}>카테고리가 없으시다면????? ( 카테고리를 만들고 싶으시다면 여기에 등록해주세요.) </label>
      <input className={styles.input} type="text" value={insertCategory} onChange={(e) => setInsertCategory(e.target.value)} />
      <button className={styles.button} onClick={handleInsertCategory}>카테고리 등록</button>
      <br/><br/>
      <label className={styles.label}>카테고리 선택:</label>
      <select className={styles.select} value={selectedCategory} onChange={handleCategoryChange}>
        {categoryList.map((category) => (
            <option key={category} value={category}>
            {category}
            </option>
        ))}
        </select>

      <label className={styles.label}>강의(동영상) 이름:</label>
      <input className={styles.input} type="text" value={lectureName} onChange={handleLectureNameChange} />

      <label className={styles.label}>동영상 파일 선택:</label>
      <input className={styles.fileInput} type="file" accept="video/*" onChange={handleFileChange} />

      <button className={styles.button} onClick={handleLectureRegistration}>등록</button>
    </div>
  );
};

export default AdminRegistration;
