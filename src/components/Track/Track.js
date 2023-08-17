import React from "react";
import styles from "./Track.module.css";
import SearchResults from "../SearchResults/SearchResults";

function Track({track, onTrackAction, symbol}) {

  function handleTrackAction() {
    console.log('Track handleTrackAction');
    onTrackAction(track);
  }

  return (
    <div className={styles.track + ' listItem'}>
      <div className={styles.trackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.trackAction} onClick={handleTrackAction}>{symbol}</button>
    </div>
  );
}

export default Track;