import React, { useState } from "react";
import "./Dashboard.scss";
import DashboardHeader from "../dashboard-header/DashboardHeader";
import DashboardSidebar from "../dashboard-sidebar/DashboardSidebar";

const Dashboard = ({ component: Component }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <div className="dashboard">
      <DashboardHeader menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className="start dashboard_wrap">
        <div
          className={`dashboard_sidebar ${
            menuIsOpen && "dashboard_sidebar_open"
          }`}
        >
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
