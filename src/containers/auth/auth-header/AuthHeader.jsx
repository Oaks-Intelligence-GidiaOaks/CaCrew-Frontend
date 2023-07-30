import React from "react";
import "./AuthHeader.scss";
import { Link } from "react-router-dom";
import { Button } from "components";
import { carbon } from "assets/images";

const AuthHeader = ({text, buttonText, link}) => {
  return (
    <div className="auth_header between">
      <div className="auth_header_logo">
        {/* <span className="auth_header_logo_bold">Ca</span>Crew */}
        <img src={carbon} className="auth_header_logo_img" alt="logo" />
      </div>
      <Link
        to={link}
        className="auth_header_textbtn_wrap center link"
      >
        <div className="auth_header_text">{text}</div>
        <Button text={buttonText} className={"auth_header_btn"} />
      </Link>
    </div>
  );
};

export default AuthHeader;
