import React from "react";
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({songList}) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={songList} />
    </div>
  );
}

export default SearchResults;