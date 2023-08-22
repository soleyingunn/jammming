import React, { useEffect } from "react";
import Tracklist from '../Tracklist/Tracklist';
import { useState } from 'react';
import styles from "./Playlist.module.css"

function Playlist({playlist, onSavePlaylist, onRemoveTrack}) {

  const [playlistName, setPlaylistName] = useState("");

  function handleSavePlaylist() {
    playlist.name = playlistName;
    onSavePlaylist(playlist);
  }

  function handleNameChange(e) {
    setPlaylistName(e.target.value);
  }

  useEffect(() => {
    setPlaylistName(playlist.name);
  }, [playlist]); 

  return (
    <div className={styles.Playlist}>
      <input className="inputField" onChange={handleNameChange} value={playlistName} placeholder="New Playlist" />
      <button className="actionButton" onClick={handleSavePlaylist}>
        <span className={styles.icon}></span> 
      </button>
      <Tracklist heightOffset="130px" tracklistTracks={playlist.tracks} onTrackAction={onRemoveTrack} symbol="-" />
    </div>
  );
}

export default Playlist;