import React from "react";
import "./WhyUsCard.scss";

const WhyUsCard = ({ image, heading, text }) => {
  return (
    <div className="why_us_card">
      <img src={image} alt="icon" className="why_us_card_img" />
      <div className="why_us_card_heading">{heading}</div>
      <div className="why_us_card_text">{text}</div>
    </div>
  );
};

export default WhyUsCard;
