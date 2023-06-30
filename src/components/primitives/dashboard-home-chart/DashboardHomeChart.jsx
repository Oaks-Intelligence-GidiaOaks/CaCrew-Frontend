import { frame } from "assets/images";
import React from "react";
import "./DashboardHomeChart.scss";

const DashboardHomeChart = () => {
  return (
    <div className="dashboard_home_chart">
      <img src={frame} alt="frame" className="dashboard_home_chart_image" />
    </div>
  );
};

export default DashboardHomeChart;
