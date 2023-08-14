import React from "react";
import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({onSearch}) {

  const [searchTerm, setSearchTerm] = useState();

  function handleSearchChange(e) {
    console.log('handleSearchChange');
    setSearchTerm(e.target.value);

    if (e.keyCode === 13) {
      console.log('ENTER');
      onSearch(e.target.value);
    }
  }

  function handleButton(e) {
    console.log('Button Clicked!');
    onSearch(searchTerm);
  }

  return (
    <div className="SearchBar">
      <input onChange={handleSearchChange} placeholder="Enter A Song, Album, or Artist" />
      <button className={styles.SearchButton} onClick={handleButton}>SEARCH</button>
    </div>
  );
}

export default SearchBar;