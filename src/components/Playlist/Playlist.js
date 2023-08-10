import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import { useState } from 'react';

function Playlist({playlist, onSavePlaylist}) {

  const [playlistName, setPlaylistName] = useState(playlist.name);

  function handleNameChange(e) {
    console.log('handleNameChange');
    setPlaylistName(e.target.value);
  }

  function handleSavePlaylist() {
    console.log('handleSavePlaylist');
    playlist.name = playlistName;
    onSavePlaylist(playlist);
  }
    
  return (
    <div className="Playlist">
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <Tracklist tracklistTracks={playlist.tracks} />

      <button className="Playlist-save" onClick={handleSavePlaylist}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;