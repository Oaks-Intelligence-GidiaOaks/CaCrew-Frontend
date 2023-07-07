import React from "react";
import "./OrgVerifyDashboardBanner.scss";
import { checklist } from "assets/images";

const OrgVerifyDashboardBanner = () => {
  return (
    <div className="between dashboard_banner">
      <div>
        <div className="dashboard_banner_bold">
          Your Account is Ongoing Verification
        </div>
        <div className="dashboard_banner_text">
          Feel free to take a tour while we finish setting up your account
        </div>
      </div>
      <img src={checklist} alt="checklist" />
    </div>
  );
};

export default OrgVerifyDashboardBanner;