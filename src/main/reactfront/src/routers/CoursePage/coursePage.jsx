// LecturePage.js
import React, { useState } from 'react';
// eslint-disable-next-line
import styles from './LecturePage.module.css';

const LecturePage = () => {
  const [category, setCategory] = useState('전체');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const lectureData = [
    { id: 1, title: '기초 교양1', category: '교양' },
    { id: 2, title: '기초 교양2', category: '교양' },
    { id: 3, title: '기초 교양3', category: '교양' },
    { id: 4, title: '기초 철학1', category: '철학' },
    { id: 5, title: '기초 철학2', category: '철학' },
    { id: 6, title: '기초 철학3', category: '철학' },
    { id: 7, title: '기초 정치1', category: '정치' },
    { id: 8, title: '기초 정치2', category: '정치' },
    { id: 9, title: '기초 정치3', category: '정치' },
  ];

  const filteredLectures = category === '전체'
    ? lectureData
    : lectureData.filter(lecture => lecture.category === category);

  return (
    <div className={styles.container}>
      <div>
        <label className={styles.label}>카테고리 선택:</label>
        <select className={styles.select} value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="전체">전체</option>
          <option value="교양">교양</option>
          <option value="철학">철학</option>
          <option value="정치">정치</option>
        </select>
      </div>

      <div>
        <h2 className={styles.title}>{category} 카테고리의 강의 목록</h2>
        <ul className={styles.list}>
          {filteredLectures.map(lecture => (
            <li key={lecture.id} className={styles.item}>{lecture.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturePage;
