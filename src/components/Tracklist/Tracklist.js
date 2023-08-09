import React from "react";
import Track from "../Track/Track";


function Tracklist({tracklistTracks, onTrackAction}) {

  console.log('tracklistTracks: ', tracklistTracks);

  return (
    <div className="Tracklist">
        {tracklistTracks.map(t => 
          <Track key={t.id} track={t} onTrackAction={onTrackAction} />
        )}
    </div>
  );
}

export default Tracklist;