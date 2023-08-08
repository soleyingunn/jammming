import React from "react";
import Track from "../Track/Track";


function Tracklist({tracks}) {

  return (
    <div className="Tracklist">
        {tracks.map(t => <Track key={t.id} track={t} />)}
    </div>
  );
}

export default Tracklist;