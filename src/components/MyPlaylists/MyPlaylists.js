import React, {useEffect, useState} from "react";
import styles from "./MyPlaylists.module.css"

function MyPlaylists({myPlaylists, handleSelectPlaylist}) {

    console.log('myPlaylists', myPlaylists);
    const [playlists, setPlaylists] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    function handleFilterPlaylists(e) {
        if(e.keyCode === 13) {
            console.log('handleFilterPlaylists');
            console.log('e.target.value', e.target.value);
            setSearchTerm(e.target.value);
            const filteredPlaylists = myPlaylists.filter(playlist => playlist.name.includes(e.target.value));
            console.log('filteredPlaylists', filteredPlaylists);
            setPlaylists(filteredPlaylists);
        }
    }

    useEffect(() => {
        setPlaylists(playlists);
    }, [searchTerm]);

    if(playlists.length==0 && myPlaylists.length>0){
        setPlaylists(myPlaylists);
    }

  return (
    <div className="MyPlaylists">
        <input className="inputField" onKeyUp={handleFilterPlaylists} placeholder="Find a Playlist"/>
      {playlists?.map((playlist, i) =>
          <div key={i} className="listItem" onClick={()=>{handleSelectPlaylist(playlist);}} ><h3>{playlist.name}</h3></div>
        )}
    </div>
  );
}

export default MyPlaylists;
