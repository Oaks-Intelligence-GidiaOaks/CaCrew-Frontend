import React, { useEffect } from "react";
import "./OrgStaffDashboard.scss";
import { ProjectPreview, StaffDashBanner } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/slices/modal.slice";

const OrgStaffDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.firstUse) {
      dispatch(openModal({ component: "ChangePassword" }));
    }
  }, []);

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
