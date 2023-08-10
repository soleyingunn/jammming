import React from "react";
import Track from "../Track/Track";


function Tracklist({tracklistTracks, onTrackAction, symbol}) {

  console.log('tracklistTracks: ', tracklistTracks);


  return (
    <div className="Tracklist">
        {tracklistTracks.map((t, i) => 
          <Track key={i} track={t} onTrackAction={onTrackAction} symbol={symbol} />
        )}
    </div>
  );
}

export default Tracklist;