import React from "react";
import "./DashboardHome.scss";
import {
  OrgAdminDashboardHomeCredit,
  OrgAdminDashboardHomeProject,
  DashboardWallet,
  DashboardBanner,
  OrgAdminDashboardHomeChart,
} from "components/primitives";

const DashboardHome = () => {
  return (
    <div className="dashboard_home start col">
      <DashboardBanner />
      <OrgAdminDashboardHomeCredit />
      <div className="between wallet_project_wrap">
        <div className="wallet_project_wrap_left">
          <DashboardWallet />
        </div>
        <div className="wallet_project_wrap_right">
          <OrgAdminDashboardHomeProject />
        </div>
      </div>
      <OrgAdminDashboardHomeChart />
    </div>
  );
};

export default DashboardHome;
