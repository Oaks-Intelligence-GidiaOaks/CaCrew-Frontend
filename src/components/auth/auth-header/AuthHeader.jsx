import React from "react";
import "./AuthHeader.scss";
import { Link } from "react-router-dom";
import Button from "components/widgets/Button/Button";

const AuthHeader = ({text, buttonText}) => {
  return (
    <div className="auth_header between">
      <div className="auth_header_logo">
        <span className="auth_header_logo_bold">Ca</span>Crew
      </div>
      <Link
        to={"/register_company"}
        className="auth_header_textbtn_wrap center link"
      >
        <div className="auth_header_text">{text}</div>
        <Button text={buttonText} className={"auth_header_btn"} />
      </Link>
    </div>
  );
};

export default AuthHeader;
