import React from "react";
import "./TrackProjectProgress.scss";

const TrackProjectProgress = ({ phase }) => {
  const progress =
    phase === "Phase2"
      ? "20%"
      : phase === "Phase3"
      ? "40%"
      : phase === "Phase4"
      ? "60%"
      : phase === "Phase5"
      ? "80%"
      : phase === "Phase6"
      ? "100%"
      : "0";

  return (
    <div className="track_proj_progress between">
      <div className="track_proj_progress_bar_wrap start col">
        <div className="track_proj_progress_bar"></div>
        <div
          className="track_proj_progress_bar_two"
          style={{ width: progress }}
        ></div>
      </div>
      <div className="track_proj_progress_text">{progress}</div>
    </div>
  );
};

export default TrackProjectProgress;
