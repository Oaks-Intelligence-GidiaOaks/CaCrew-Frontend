import Button from "components/widgets/Button/Button";
import React from "react";
import "./DashboardHeader.scss";

const DashboardHeader = ({ text, buttonText }) => {
  return (
    <div className="dashboard_header between">
      <div className="dashboard_header_logo">
        <span className="dashboard_header_logo_bold">Ca</span>Crew
      </div>
      <div className="dashboard_header_textbtn_wrap center">
        <div className="dashboard_header_text">{text}</div>
        <Button text={buttonText} className={"dashboard_header_btn"}/>
      </div>
    </div>
  );
};

export default DashboardHeader;
