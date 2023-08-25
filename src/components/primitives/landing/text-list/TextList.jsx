import React from "react";
import "./TextList.scss";
import { Button } from "components";
import { tick } from "assets/images";

const TextList = ({ list, heading, buttonBg, noButtton }) => {
  return (
    <div className="text_list">
      <div className="text_list_heading_wrap">
        <div
          dangerouslySetInnerHTML={{
            __html: heading,
          }}
          className="text_list_heading grad_text"
        />
      </div>

      {list?.map((item, idx) => (
        <div className="start text_list_wrap">
          <img src={tick} alt="tick" className="text_list_tick_img" />
          <div key={idx} className="text_list_text">
            {item}
          </div>
        </div>
      ))}
      {!noButtton && (
        <Button
          className={"text_list_btn"}
          style={{ background: `${buttonBg}` }}
          text={"Get Started"}
        />
      )}
    </div>
  );
};

export default TextList;
