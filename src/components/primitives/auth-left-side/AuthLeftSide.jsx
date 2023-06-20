import React from "react";
import "./AuthLeftSide.scss";

const AuthLeftSide = () => {
  return (
    <div className="auth_left_side center col">
      {/* <div className="auth_left_side_title">
        <span className="auth_left_side_title_bold">Ca</span>Crew
      </div> */}
      <div className="auth_left_side_text_wrap">
        <span className="auth_left_side_text_light">Digital Platform For</span>
        <br />
        Trading Carbon credits
      </div>
      <div className="auth_left_side_float"></div>
      <div className="auth_left_side_float_one"></div>
      <div className="auth_left_side_float_two"></div>
    </div>
  );
};

export default AuthLeftSide;
