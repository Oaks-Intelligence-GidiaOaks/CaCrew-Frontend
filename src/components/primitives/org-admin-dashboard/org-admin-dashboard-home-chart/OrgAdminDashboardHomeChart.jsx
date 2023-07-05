import { frame } from "assets/images";
import React from "react";
import "./OrgAdminDashboardHomeChart.scss";

const OrgAdminDashboardHomeChart = () => {
  return (
    <div className="org_admin_dashboard_home_chart">
      <img src={frame} alt="frame" className="dashboard_home_chart_image" />
    </div>
  );
};

export default OrgAdminDashboardHomeChart;
