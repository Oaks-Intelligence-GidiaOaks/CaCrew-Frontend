import React from "react";
import "./FeaturesCard.scss";

const FeaturesCard = ({ image, text }) => {
  return (
    <div className="feature_card center col">
      <img src={image} alt="feature" className="feature_card_img" />
      <div className="feature_card_text">{text}</div>
    </div>
  );
};

export default FeaturesCard;
