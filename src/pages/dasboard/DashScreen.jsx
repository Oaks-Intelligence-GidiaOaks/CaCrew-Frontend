import Dasboard from "components/dashboard/dashboard-container/Dashboard";
import React from "react";
import DashboardHome from "components/dashboard/dashboard-content/dashboard-home/DashboardHome";

const DashScreen = () => {
  return (
    <div>
      <Dasboard component={DashboardHome} />
    </div>
  );
};

export default DashScreen;
