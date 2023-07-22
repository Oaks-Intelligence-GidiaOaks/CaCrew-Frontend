import React from "react";
import "./Badge.scss";

const Badge = ({ image, text }) => {
  return (
    <div className={`badge center ${text === "Verified" && "badge_verified"}`}>
      <img src={image} alt="icon" className="badge_img" />
      <span className="badge_text">{text}</span>
    </div>
  );
};

export default Badge;
