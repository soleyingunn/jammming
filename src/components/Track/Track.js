import React from "react";
import styles from "./Track.module.css";

function Track({track, onTrackAction}) {

  function handleTrackAction() {
    console.log('Track handleTrackAction');
    onTrackAction(track);
  }

  return (
    <div className={styles.track}>
      <div className={styles.trackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.trackAction} onClick={handleTrackAction}>{"+"}</button>
    </div>
  );
}

export default Track;