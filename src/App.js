import React from "react";
import logo from './logo.svg';
import './App.css';
import { getTestData } from './services/DataService';
import { useEffect, useState } from 'react';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import SearchBar from "./components/SearchBar/SearchBar";

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState({name: "New Playlist", tracks: []});


  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestData();
      setSearchResults(data);
    };
    fetchData();
  }, [])

  function handleAddTrack(track) {
    console.log('track:', track);
    const newPlaylist = {...playlist};
    const playlistTracks = [...playlist.tracks];
    newPlaylist.tracks = playlistTracks;
    playlistTracks.push(track);
    setPlaylist(newPlaylist);
  }

  function handleRemoveTrack(track) {
    console.log('handleRemoveTrack');
    const newPlaylist = {...playlist};
    const playlistTracks = [...playlist.tracks];
    newPlaylist.tracks = playlistTracks;
    playlistTracks.splice(track, 1);
    setPlaylist(newPlaylist);
  };

  function handleSavePlaylist(playlist) {
    console.log('handleSavePlaylist');
    console.log('playlist:', playlist);
    const uriArray = [];
    playlist.tracks.map((t) => uriArray.push(t.uri));
    console.log('uriArray:', uriArray);
  };


  return (
    <div className="App">
      <div className="column">
        <SearchBar />
        <SearchResults searchResultsTracks={searchResults} onAddTrack={handleAddTrack}/>
      </div>
      <div className="column">
        <Playlist playlist={playlist} onSavePlaylist={handleSavePlaylist} onRemoveTrack={handleRemoveTrack} />
      </div>
    </div>
  );
}


export default App;
