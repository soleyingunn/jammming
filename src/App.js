import React from "react";
import logo from './logo.svg';
import './App.css';
import { getTestData } from './services/DataService';
import { useEffect, useState } from 'react';
import SearchResults from './components/SearchResults/SearchResults';

function App() {

  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestData();
      setTestData(data);
    };

    fetchData();
  
  }, [])

  return (
    <div className="App">
      <SearchResults songList={testData} />
    </div>
  );
}


export default App;
