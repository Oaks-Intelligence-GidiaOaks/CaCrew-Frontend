import React, { useEffect, useState } from "react";
import "./DashboardSidebar.scss";
import { NavLink } from "react-router-dom";
import {
  gridwhite,
  projectblue,
  staffblue,
  gridblue,
  staffwhite,
  projectwhite,
} from "assets/images";
import { useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const [pathname, setPathName] = useState();
  const location = useLocation();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  return (
    <div className="dashboard_sidebar">
      <div className="dashboard_link_item_wrap center col">
        <NavLink
          to={"/dashboard"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard" ? gridwhite : gridblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Dashboard
        </NavLink>
        <NavLink
          to={"/dashboard_organization"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={
              pathname === "/dashboard_organization" ? staffwhite : staffblue
            }
            alt="icon"
            className="dashboard_link_item_image"
          />
          Organistion
        </NavLink>
        <NavLink
          to={"/dashboard_project"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard_project" ? projectwhite : projectblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Projects
        </NavLink>
        <NavLink
          to={"/dashboard_staff"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard_staff" ? staffwhite : staffblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Staffs
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
