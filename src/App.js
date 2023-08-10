import React from "react";
import './App.css';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { getTestData } from './services/DataService';
import SpotifyService from "./services/SpotifyService";
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

    if(!SpotifyService.isAuthorized()){
      SpotifyService.authorize();
    }else{
      console.log('save!');
    }

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
