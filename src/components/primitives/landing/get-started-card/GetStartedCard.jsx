import React from "react";

const GetStartedCard = ({ image, text }) => {
  return (
    <div className="get_started_card">
      <img src={image} alt="" className="get_started_card_img" />
      <div className="get_started_card_text">{text}</div>
    </div>
  );
};

export default GetStartedCard;
