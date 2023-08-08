import React from "react";

function Track({track}) {
    console.log("Track");
    console.log(track);
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className="Track-action">{/* + or - will go here */}</button>
    </div>
  );
}

export default Track;