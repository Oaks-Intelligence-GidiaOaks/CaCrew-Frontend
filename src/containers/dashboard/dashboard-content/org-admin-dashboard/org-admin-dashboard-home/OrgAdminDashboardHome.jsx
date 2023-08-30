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

  // Func finds and update target filter parameter
   const handleToggleFilter = (target) => {
    target && setFilter((prev) => ({ ...prev, [target]: prev[target] === true ? false : true }));
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
        <ChartFilter title={"Carbon Credit Overview"} handleToggleFilter={handleToggleFilter}/>
        <div className="dashboard_home_chart">
          <div className="dashboard_home_chart_width">
            <CarbonCreditChart filter={filter}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHome;
