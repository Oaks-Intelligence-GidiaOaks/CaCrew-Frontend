import React, { useState } from "react";
import "./OrgAdminDashboardHome.scss";
import {
  OrgAdminDashboardHomeCredit,
  ProjectPreview,
  DashboardWallet,
  OrgVerifyDashboardBanner,
  CarbonCreditChart,
  ChartFilter,
} from "components";

const OrgAdminDashboardHome = () => {
  // set state to manage chart filter buttons
  const [filter, setFilter] = useState({
    bought: true,
    sold: true,
    retired: true,
  });
  const handleToggleFilter = (target) => {
    setFilter((prev) => ({ ...prev, [target]: !filter.target }));
  };
  return (
    <div className="dashboard_home start col dash_pad">
      <OrgVerifyDashboardBanner />
      <OrgAdminDashboardHomeCredit />
      <div className="between wallet_project_wrap">
        <div className="wallet_project_wrap_left">
          <DashboardWallet />
        </div>
        <div className="wallet_project_wrap_right">
          <ProjectPreview />
        </div>
      </div>
      <div className="dashboard_home_chart_wrap">
        <ChartFilter title={"Carbon Credit Overview"} />
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
