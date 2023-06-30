import React from "react";
import "./DashboardSidebar.scss";
import { NavLink } from "react-router-dom";
import { grid, staff } from "assets/images";

const DashboardSidebar = () => {
  return (
    <div className="dashboard_sidebar">
      <div className="dashboard_link_item_wrap center col">
        <NavLink
          exact
          to={"/dashboard"}
          activeClassName="active"
          className={"link dashboard_link_item start"}
        >
          <img src={grid} alt="icon" className="dashboard_link_item_image" />
          Dashboard
        </NavLink>
        <NavLink
          exact
          to={"/organization"}
          activeClassName="active"
          className={"link dashboard_link_item start"}
        >
          <img src={staff} alt="icon" className="dashboard_link_item_image" />
          Organistion
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
