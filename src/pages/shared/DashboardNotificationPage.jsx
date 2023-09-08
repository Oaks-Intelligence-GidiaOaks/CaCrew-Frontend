import React from "react";
import { Dashboard } from "containers";
import { DashboardNotification } from "containers";

const DashboardNotificationPage = () => {
  return (
    <>
      <Dashboard component={DashboardNotification} />
    </>
  );
};

export default DashboardNotificationPage;
