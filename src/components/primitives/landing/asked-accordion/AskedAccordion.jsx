import React, { useState } from "react";
import "./AskedAccordion.scss";
import { down } from "assets/images";

const AskedAccordion = ({ title, text }) => {
  const [isOpen, setIsOPen] = useState(false);
  return (
    <div className={`asked_accordion ${isOpen && "asked_accordion_open"}`} onClick={() => setIsOPen(!isOpen)}>
      <div className="asked_accordion_title_wrap between">
        <div className="asked_accordion_title">{title}</div>
        <div className="asked_accordion_img_wrap center">
          <img src={down} alt="icon" className="asked_accordion_img" />
        </div>
      </div>
      <div className="asked_accordion_text">{text}</div>
    </div>
  );
};

export default AskedAccordion;
