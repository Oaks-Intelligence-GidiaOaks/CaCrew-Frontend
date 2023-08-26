import React from "react";
import "./AskedAccordion.scss";
import { down } from "assets/images";

const AskedAccordion = ({ title, text }) => {
  return (
    <div className="asked_accordion">
      <div className="asked_accordion_title_wrap">
        <div className="asked_accordion_title">{title}</div>
        <div className="asked_accordion_img_wrap">
          <img src={down} alt="icon" className="asked_accordion_img" />
        </div>
      </div>
      <div className="asked_accordion_text">{text}</div>
    </div>
  );
};

export default AskedAccordion;
