import React from "react";
import "./OrgAdminDashboardHome.scss";
import {
  OrgAdminDashboardHomeCredit,
  OrgAdminDashboardHomeProject,
  DashboardWallet,
  OrgVerifyDashboardBanner,
  CarbonCreditChart,
  ChartFilter,
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
      <div className="dashboard_home_chart_wrap">
        <ChartFilter title={"Carbon Credit Overview"}/>
        <div className="dashboard_home_chart">
          <div className="dashboard_home_chart_width">
            <CarbonCreditChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHome;
