import React from "react";
import "./OrgStaffDashboard.scss";
import { ProjectPreview, StaffDashBanner } from "components";

const OrgStaffDashboard = () => {
  return (
    <div className="org_staff_dash">
      <StaffDashBanner />
      <div className="dash_pad">
        <ProjectPreview />
      </div>
    </div>
  );
};

export default OrgStaffDashboard;
