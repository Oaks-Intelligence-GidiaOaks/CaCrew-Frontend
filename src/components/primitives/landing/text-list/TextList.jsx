import React from "react";
import "./TextList.scss";
import { Button } from "components";
import { tick } from "assets/images";
import { Link } from "react-router-dom";

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
      <div className="start col">
        {list?.map((item, idx) => (
          <div className="start text_list_wrap">
            <img src={tick} alt="tick" className="text_list_tick_img" />
            <div key={idx} className="text_list_text">
              {item}
            </div>
          </div>
        ))}
      </div>
      {!noButtton && (
        <Link to={"/register-company"} className="link">
          <Button
            className={"text_list_btn"}
            style={{ background: `${buttonBg}` }}
            text={"Get Started"}
          />
        </Link>
      )}
    </div>
  );
};

export default TextList;
