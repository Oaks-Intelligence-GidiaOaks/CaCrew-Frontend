import React from "react";
import "./OrgAdminDashboardHomeProject.scss";
import { square } from "assets/images";
import { Link } from "react-router-dom";

const OrgAdminDashboardHomeProject = () => {
  return (
    <div className="org_dash_home_project">
      <div className="org_dash_home_project_heading">Projects</div>
      <div className="org_dash_home_project_wrap">
        <div className="org_dash_home_project_wrap_heading_wrap between">
          <div className="org_dash_home_project_wrap_heading">Title</div>
          <div className="org_dash_home_project_wrap_heading">Progress</div>
          <div className="org_dash_home_project_wrap_heading">View All</div>
        </div>
        <div className="org_dash_home_project_empty center col">
          <img src={square} alt="icon" />
          <Link to={"/dashboard-project"} className="org_dash_home_project_empty_text">
            Create a Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHomeProject;
