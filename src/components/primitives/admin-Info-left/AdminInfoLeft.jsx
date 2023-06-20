import React from "react";
import "./AdminInfoLeft.scss";

const AdminInfoLeft = () => {
  return (
    <div className="admin_info_left center col">
      <div className="admin_info_left_text_bold">
        Finish Setting Up Your Account
      </div>
      <div className="admin_info_left_text_light">
        Tell us about yourself and your role in the Organization. Only
        authorized personnel's can create account behalf of a company. We would
        reach out to verify all details provided.
      </div>
      <div className="admin_info_left_float"></div>
      <div className="admin_info_left_float_one"></div>
    </div>
  );
};

export default AdminInfoLeft;
