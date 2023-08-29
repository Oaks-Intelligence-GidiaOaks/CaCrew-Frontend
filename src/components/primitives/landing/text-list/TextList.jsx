import React from "react";
import "./TextList.scss";
import { Button } from "components";
import { tick } from "assets/images";
import { Link } from "react-router-dom";
import ScrollEffect from "components/animation/ScrollEfect";

const TextList = ({ list, heading, buttonBg, noButtton }) => {
  return (
    <div className="text_list">
      <ScrollEffect
        inViewProperties={{
          y: [20, 0],
          opacity: [0, 1],
        }}
        // inViewDelay={0.2}
        inViewTransitionTime={0.5}
        className="text_list_heading_wrap"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: heading,
          }}
          className="text_list_heading grad_text"
        />
      </ScrollEffect>

      <div className="start col">
        {list?.map((item, idx) => (
          <ScrollEffect
            inViewProperties={{
              y: [20, 0],
              opacity: [0, 1],
            }}
            inViewDelay={(idx + 1) * 0.1}
            inViewTransitionTime={0.5}
          >
            <div className="start text_list_wrap">
              <img src={tick} alt="tick" className="text_list_tick_img" />
              <div key={idx} className="text_list_text">
                {item}
              </div>
            </div>
          </ScrollEffect>
        ))}
      </div>
      {!noButtton && (
        <ScrollEffect
          inViewProperties={{
            y: [20, 0],
            opacity: [0, 1],
          }}
          inViewDelay={0.8}
          inViewTransitionTime={0.5}
        >
          <Link to={"/register-company"} className="link">
            <Button
              className={"text_list_btn"}
              style={{ background: `${buttonBg}` }}
              text={"Get Started"}
            />
          </Link>
        </ScrollEffect>
      )}
    </div>
  );
};

export default TextList;
