import React from "react";
import "./Dashboard.scss";
import DashboardHeader from "../dashboard-header/DashboardHeader";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";

const Dashboard = ({ component: Component }) => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="start dashboard_wrap">
        <div className="dashboard_sidebar">
          <DashboardSidebar />
        </div>
        <div className="dashboard_content">
          <Component />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
