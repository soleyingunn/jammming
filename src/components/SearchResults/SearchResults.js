import React from "react";
import Tracklist from '../Tracklist/Tracklist';
import styles from "./SearchResults.module.css";

function SearchResults({searchResultsTracks, onAddTrack}) {

  return (
    searchResultsTracks.length > 0 && (
      <div className={styles.searchResults}>
        <h2>Results</h2>
        <Tracklist tracklistTracks={searchResultsTracks} onTrackAction={onAddTrack} symbol="+"/>
      </div>
      )
  );
}

export default SearchResults;