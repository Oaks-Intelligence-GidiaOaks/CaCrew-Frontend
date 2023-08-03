import React from "react";
import { Dashboard } from "containers";
import { DashboardMessage } from "containers";

const DashboardMessagePage = () => {
  return (
    <>
      <Dashboard component={DashboardMessage} />
    </>
  );
};

export default DashboardMessagePage;
