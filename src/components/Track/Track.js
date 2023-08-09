import React from "react";
import styles from "./Track.module.css";

function Track({track, onTrackAction}) {
    console.log("Track");
    console.log(track);



  return (
    <div className={styles.track}>
      <div className={styles.trackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.trackAction} onClick={onTrackAction}>{"+"}</button>
    </div>
  );
}

export default Track;