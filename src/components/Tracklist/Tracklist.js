import React from "react";
import Track from "../Track/Track";


function Tracklist({tracklistTracks, onTrackAction, symbol}) {

  function handleTrackAction(i, track) {
    onTrackAction(i, track);
  }

  return (
    <div className="Tracklist">
        {tracklistTracks.map((t, i) => 
          <Track key={i} track={t} onTrackAction={() => {handleTrackAction(i, t);}} symbol={symbol} />
        )}
    </div>
  );
}

export default Tracklist;