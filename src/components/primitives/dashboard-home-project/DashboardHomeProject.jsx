import React from "react";
import "./DashboardHomeProject.scss";
import { square } from "assets/images";

const DashboardHomeProject = () => {
  return (
    <div className="dashboard_home_project">
      <div className="dashboard_home_project_heading">Projects</div>
      <div className="dashboard_home_project_wrap">
        <div className="dashboard_home_project_wrap_heading_wrap between">
          <div className="dashboard_home_project_wrap_heading">Title</div>
          <div className="dashboard_home_project_wrap_heading">Progress</div>
          <div className="dashboard_home_project_wrap_heading">View All</div>
        </div>
        <div className="dashboard_home_project_empty center col">
          <img src={square} alt="icon" />
          <div className="dashboard_home_project_empty_text">
            Create a Project
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeProject;
