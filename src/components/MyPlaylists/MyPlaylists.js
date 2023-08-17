import React from "react";

function MyPlaylists({myPlaylists, handleSelectPlaylist}) {

  return (
    <div className="MyPlaylists">
      <h2>My Playlists</h2>
      {myPlaylists?.map((playlist, i) => 
          <div key={i} playlist={playlist} onClick={()=>{handleSelectPlaylist(playlist);}} >{playlist.name}</div>
        )}
    </div>
  );
}

export default MyPlaylists;
