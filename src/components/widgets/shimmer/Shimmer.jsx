import React from "react";
import "./Shimmer.scss";

const Shimmer = ({ height, width }) => {
  const style = {
    height: `${height || "10px"}`,
    width: `${width || "100%"}`,
  };

  return (
    <div className="shimmer-wrapper" style={style}>
      <div className="shimmer" ></div>
    </div>
  );
};

export default Shimmer;
