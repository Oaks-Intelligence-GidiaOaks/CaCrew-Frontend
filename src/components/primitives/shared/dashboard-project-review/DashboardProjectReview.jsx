import React from "react";
import "./DashboardProjectReview.scss";
import { doc, dots } from "assets/images";

const data = [
  {
    sn: 1,
    applicationId: "A123456",
    date: "01/01/2023",
    initiator: "John Doe",
    carbonCredit: "500 tCO2e",
    // documentation: "Yes",
  },
  {
    sn: 2,
    applicationId: "B789012",
    date: "02/02/2023",
    initiator: "Jane Smidiv",
    carbonCredit: "320 tCO2e",
    // documentation: "No",
  },
  {
    sn: 3,
    applicationId: "C345678",
    date: "03/03/2023",
    initiator: "Bob Lee",
    carbonCredit: "320 tCO2e",
    // documentation: "Yes",
  },
];

const DashboardProjectReview = () => {
  return (
    <div className="dashboard_project_review">
      <div className="dashboard_project_table">
        <div className="dashboard_project_table_head between">
          <div className="dashboard_project_table_head_item">S/N</div>
          <div className="dashboard_project_table_head_item">
            Application ID
          </div>
          <div className="dashboard_project_table_head_item">Date</div>
          <div className="dashboard_project_table_head_item">Initiator</div>
          <div className="dashboard_project_table_head_item">Carbon-Credit</div>
          <div className="dashboard_project_table_head_item">Documentation</div>
          <div
            className="dashboard_project_table_head_item"
            style={{ width: "30px" }}
          ></div>
        </div>
        {data.map((row, idx) => (
          <div
            key={row.sn}
            className={`dashboard_project_table_body between ${
              (idx + 1) % 2 === 0 && "dashboard_project_table_body_bg"
            }`}
          >
            <div className="dashboard_project_table_body_item">{row.sn}</div>
            <div className="dashboard_project_table_body_item">
              {row.applicationId}
            </div>
            <div className="dashboard_project_table_body_item">{row.date}</div>
            <div className="dashboard_project_table_body_item">
              {row.initiator}
            </div>
            <div className="dashboard_project_table_body_item">
              {row.carbonCredit}
            </div>
            <div className="dashboard_project_table_body_item">
              <img src={doc} alt="icon" />
            </div>
            <div
              className="dashboard_project_table_body_item"
              style={{ width: "30px", fontSize: "20px" }}
            >
              <img src={dots} alt="icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProjectReview;
