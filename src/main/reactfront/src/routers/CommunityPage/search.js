import React, { useEffect, useState, useRef } from "react";
import styles from './css/search.module.css';

const Search = ({ handleSearch, handleSearchCondition, searchStart }) => {

    const [query, setQuery] = useState('');
    const [searchOption, setSearchOption] = useState('null'); // 초기 검색 옵션 설정

    const [selectedQuery , setSelectedQuery] = useState('');
    const [selectedsearchOption , setSelectedSearchOption] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSearchOption(e.target.value);
  };

  function searchButtonClick(){
    if(searchOption === "null"){
        alert("검색조건을 설정해주세요");
        return;
    }
    if(query === ''){
        alert("검색어를 입력해주세요");
        return;
    }
    
    handleSearch(query);
    handleSearchCondition(searchOption);
    searchStart();
    setSelectedQuery(query);
    if(searchOption === "c.community_title"){
        setSelectedSearchOption("제목");
    }else if(searchOption === "c.community_content"){
        setSelectedSearchOption("내용");
    }else if(searchOption === "u.user_nickname"){
        setSelectedSearchOption("작성자");
    }
    setQuery("");
    setSearchOption("null");
  }

  
  return (
    <div className={styles['search-container']}>
        {selectedQuery !== '' && selectedsearchOption !== '' ? <div className={styles['search-selected']}><h3>검색조건 : {selectedsearchOption}</h3><h3>검색어: {selectedQuery}</h3></div>: null}
      <select value={searchOption} onChange={handleSelectChange} className={styles['search-select']}>
        <option value="null">검색조건</option>
        <option value="c.community_title">제목</option>
        <option value="c.community_content">내용</option>
        <option value="u.user_nickname">작성자</option>
      </select>
        <input
        type="text"
        className={styles['search-input']}
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleChange}
      />
      <button type="button" onClick={searchButtonClick} className={styles['search-button']}>검색</button>
    </div>
    
  );
}

export default Search;