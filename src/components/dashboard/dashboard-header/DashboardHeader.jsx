import Button from "components/widgets/Button/Button";
import React from "react";
import "./DashboardHeader.scss";
import { Link } from "react-router-dom";

const DashboardHeader = ({ text, buttonText }) => {
  return (
    <div className="dashboard_header between">
      <div className="dashboard_header_logo">
        <span className="dashboard_header_logo_bold">Ca</span>Crew
      </div>
      <Link to={"/register_company"} className="dashboard_header_textbtn_wrap center link">
        <div className="dashboard_header_text">{text}</div>
        <Button text={buttonText} className={"dashboard_header_btn"}/>
      </Link>
    </div>
  );
};

export default DashboardHeader;
