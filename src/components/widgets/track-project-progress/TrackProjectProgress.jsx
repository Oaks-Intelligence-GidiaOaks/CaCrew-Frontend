import React from "react";
import "./TrackProjectProgress.scss";

const TrackProjectProgress = ({ phase }) => {
 
  const progress = {
    Phase2: "20%",
    Phase3: "40%",
    Phase4: "60%",
    Phase5: "80%",
    Phase6: "100%",
  }[phase];

  return (
    <div className="track_proj_progress between">
      <div className="track_proj_progress_bar_wrap start col">
        <div className="track_proj_progress_bar"></div>
        <div
          className="track_proj_progress_bar_two"
          style={{ width: progress || "0%" }}
        ></div>
      </div>
      <div className="track_proj_progress_text">{progress || "0%"}</div>
    </div>
  );
};

export default TrackProjectProgress;
