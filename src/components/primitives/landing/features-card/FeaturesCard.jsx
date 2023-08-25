import React from "react";

const FeaturesCard = ({ image, text }) => {
  return (
    <div className="get_started_card">
      <img src={image} alt="" className="get_started_card_img" />
      <div className="get_started_card_text">{text}</div>
    </div>
  );
};

export default FeaturesCard;
