// import React from 'react'
import DashboardHomeChart from "components/primitives/dashboard-home-chart/DashboardHomeChart";
import "./DashboardHome.scss";
import DashboardBanner from "components/primitives/dashboard-banner/DashboardBanner";
import DashboardHomeCredit from "components/primitives/dashboard-home-credit/DashboardHomeCredit";
import DashboardHomeProject from "components/primitives/dashboard-home-project/DashboardHomeProject";
import DashboardWallet from "components/primitives/dashboard-wallet/DashboardWallet";

const DashboardHome = () => {
  return (
    <div className="dashboard_home start col">
      <DashboardBanner />
      <DashboardHomeCredit />
      <div className="between wallet_project_wrap">
        <div className="wallet_project_wrap_left">
          <DashboardWallet />
        </div>
        <div className="wallet_project_wrap_right">
          <DashboardHomeProject />
        </div>
      </div>
      <DashboardHomeChart />
    </div>
  );
};

export default DashboardHome;
