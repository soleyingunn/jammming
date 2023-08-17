import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import { useState } from 'react';
import styles from "./Playlist.module.css"

function Playlist({playlist, onSavePlaylist, onRemoveTrack}) {

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
    <div className={styles.Playlist}>
      <input className="inputField" onChange={handleNameChange} placeholder="New Playlist" />
      <button className={styles.SaveButton} onClick={handleSavePlaylist}>
        <span className={styles.icon}></span> 
      </button>
      <Tracklist tracklistTracks={playlist.tracks} onTrackAction={onRemoveTrack} symbol="-" />
    </div>
  );
}

export default Playlist;