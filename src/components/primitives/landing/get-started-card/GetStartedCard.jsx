import React from "react";

const GetStartedCard = ({ image, heading, text, number }) => {
  return (
    <div className="get_started_card">
      <div className="get_started_card_number">{number}</div>
      <img src={image} alt="started" className="get_started_card_img"/>
      <div className="get_started_card_heading">{heading}</div>
      <div className="get_started_card_text">{text}</div>
    </div>
  );
};

export default GetStartedCard;
