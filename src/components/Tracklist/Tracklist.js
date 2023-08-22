import React from "react";
import Track from "../Track/Track";
import styles from "./Tracklist.module.css";


function Tracklist({tracklistTracks, onTrackAction, symbol, heightOffset}) {

  function handleTrackAction(i, track) {
    onTrackAction(i, track);
  }

  const myStyle = {
    height: "calc(100vh - " + heightOffset + ")",
    overflow: "scroll"
  };  

  return (
    <div style={myStyle}>
        {tracklistTracks.map((t, i) => 
          <Track key={i} track={t} onTrackAction={() => {handleTrackAction(i, t);}} symbol={symbol} />
        )}
    </div>
  );
}

export default Tracklist;
