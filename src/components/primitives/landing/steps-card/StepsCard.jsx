import React from "react";
import "./StepsCard.scss"

const StepsCard = ({ image, text }) => {
  return (
    <div className="step_card center col">
      <img src={image} alt="steps" className="step_card_img" />
      <div className="step_card_text">{text}</div>
    </div>
  );
};

export default StepsCard;
