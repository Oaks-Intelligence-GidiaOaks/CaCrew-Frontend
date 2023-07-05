import React from "react";
import "./OrgAdminDashboardHome.scss";
import {
  OrgAdminDashboardHomeCredit,
  OrgAdminDashboardHomeProject,
  DashboardWallet,
  OrgVerifyDashboardBanner,
  OrgAdminDashboardHomeChart,
} from "components";

const OrgAdminDashboardHome = () => {
  return (
    <div className="dashboard_home start col">
      <OrgVerifyDashboardBanner />
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

export default OrgAdminDashboardHome;
