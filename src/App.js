import React from "react";
import './App.css';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { getTestData } from './services/DataService';
import SpotifyService from "./services/SpotifyService";
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import SearchBar from "./components/SearchBar/SearchBar";
import MyPlaylists from './components/MyPlaylists/MyPlaylists';


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState({name: "", tracks: []});
  const [playlistsData, setPlaylistsData] = useState([]);
  const [buttonStyle, setButtonStyle] = useState({});


  function handleAddTrack(i, track) {
    console.log('track:', track);
    const newPlaylist = {...playlist};
    const playlistTracks = [...playlist.tracks];
    newPlaylist.tracks = playlistTracks;
    playlistTracks.push(track);
    setPlaylist(newPlaylist);
  }

  function handleRemoveTrack(i, track) {
    console.log('handleRemoveTrack');
    console.log(i, track);
    const newPlaylist = {...playlist};
    const playlistTracks = [...playlist.tracks];
    newPlaylist.tracks = playlistTracks;
    playlistTracks.splice(i, 1);
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
    } else {
      console.log('save!');
      SpotifyService.save(playlist).then((data) => {
        console.log('data:', data);
        SpotifyService.getPlaylists((playlists) => {
          console.log("myPlaylists: ", playlists)
          setPlaylistsData(playlists.items);
        })
      });
    }
  };

  function handleSearch(term) {
    console.log('handleSearch');
    console.log('term:', term);
    SpotifyService.search(term).then((data) => {
      console.log('data:', data);
      setSearchResults(data);
    });
  };

  function handleSelectPlaylist(playlist) {
    SpotifyService.loadPlaylist(playlist.id).then((data) => {
      if (data) {
        console.log('Loaded Playlist:', data);
        // Extract relevant playlist data (if needed)
/*         const formattedData = {
          name: data.name,
          tracks: data.tracks
        }; */
        // Perform any additional processing on formattedData
        // Set the playlist state variable using the formatted data
        // setPlaylist(formattedData);
        setPlaylist(data);
        
        console.log('Loaded Playlist:', data);
      } else {
        console.log('Failed to load playlist.');
      }
    });
  
    // call SpotifyService.loadPlaylist(playlist)
    // console.log(loadedPlaylist that I get back from SpotifyService.loadPlaylist(playlist))
    // create a new object with a name and tracks
    // maybe multiple lines that create the right data structure
    // set the playlist state variable
    // format the data right so I don't need to update Playlist.js

  };



  useEffect(() => {
    if (playlistsData?.length === 0) {
      SpotifyService.getPlaylists((playlists) => {
        setPlaylistsData(playlists.items);
      });
    }
  });


  function handleLogin() {
    if(!SpotifyService.isAuthorized()){
      SpotifyService.authorize();
    } else {
      SpotifyService.logout();
    }
  }

  useEffect(()=>{
    const profile = localStorage.getItem("profile");

    if(profile){
      const parsedProfile = JSON.parse(profile);
      const profileAvatar = parsedProfile?.images?.[0].url;
      
      const buttonStyle = {
        backgroundImage: `url('${profileAvatar}')`,
        opacity: 1
      };

      setButtonStyle(buttonStyle);
    }

  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>ja<span className="highlight">mmm</span>ing</h1>
        <button style={buttonStyle} className="avatar" onClick={handleLogin}></button>
      </header>
      <main className="main">
        <div className="column">
          <SearchBar onSearch={handleSearch} />
          <SearchResults searchResultsTracks={searchResults} onAddTrack={handleAddTrack} />
        </div>
        <div className="column">
          <Playlist playlist={playlist} onSavePlaylist={handleSavePlaylist} onRemoveTrack={handleRemoveTrack} />
        </div>
        <div className="column">
          <MyPlaylists myPlaylists={playlistsData} handleSelectPlaylist={handleSelectPlaylist} />
        </div>
      </main>
    </div>  
  );
}


export default App;
