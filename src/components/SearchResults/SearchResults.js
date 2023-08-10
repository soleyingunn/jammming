import React from "react";
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({searchResultsTracks, onAddTrack}) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracklistTracks={searchResultsTracks} onTrackAction={onAddTrack} symbol="+"/>
      
    </div>
  );
}

export default SearchResults;