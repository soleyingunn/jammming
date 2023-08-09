import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import { useState } from 'react';

function Playlist({playlist}) {
/*     const [playlistName, setPlaylistName] = useState('New Playlist');

    function handleNameChange(e) {
        console.log(e.target.value);
        const newName = e.target.value;
        setPlaylistName(newName);
    } */
    
  return (
    <div className="Playlist">
      <input /* onChange={handleNameChange}  */defaultValue={"New Playlist"} />
      <Tracklist tracklistTracks={playlist.tracks} />

      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;