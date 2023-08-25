import React from "react";

const StepsCard = ({ image, text }) => {
  return (
    <div className="step_card center">
      <img src={image} alt="steps" className="step_card_img" />
      <div className="step_card_text">{text}</div>
    </div>
  );
};

export default StepsCard;
