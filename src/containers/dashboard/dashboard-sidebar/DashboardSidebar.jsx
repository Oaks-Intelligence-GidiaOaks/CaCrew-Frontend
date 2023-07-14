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
  fileImg,
  wallet_blue,
  wallet_white,
  trackproj,
  trackprojblue,
} from "assets/images";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "redux/slices/user.slice";
import { useSelector } from "react-redux";

const DashboardSidebar = () => {
  const [pathname, setPathName] = useState();
  const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="dashboard_sidebar_wrap">
      <div className="dashboard_link_items_wrap center col">
        <NavLink
          to={"/"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/" ? gridwhite : gridblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Dashboard
        </NavLink>
        <NavLink
          to={"/dashboard-wallet"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={
              pathname?.includes("dashboard-wallet")
                ? wallet_white
                : wallet_blue
            }
            alt="icon"
            className="dashboard_link_item_image"
          />
          Carbon Credit Wallet
        </NavLink>
        {user && user?.role === "SuperAdmin" && (
          <NavLink
            to={"/dashboard-organization"}
            activeclassname="active"
            className={"link dashboard_link_item start"}
          >
            <img
              src={
                pathname === "/dashboard-organization" ? staffwhite : staffblue
              }
              alt="icon"
              className="dashboard_link_item_image"
            />
            Organistion
          </NavLink>
        )}
        <NavLink
          to={"/dashboard-project"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard-project" ? projectwhite : projectblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Projects
        </NavLink>
        {user && user?.role === "SuperAdmin" && (
          <NavLink
            to={"/dashboard-track-project"}
            activeclassname="active"
            className={"link dashboard_link_item start"}
          >
            <img
              src={
                pathname?.includes("dashboard-track-project") ? trackproj : trackprojblue
              }
              alt="icon"
              className="dashboard_link_item_image"
            />
            Track Projects
          </NavLink>
        )}
        <NavLink
          to={"/dashboard-staff"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard-staff" ? staffwhite : staffblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Staff
        </NavLink>
        <NavLink
          to={"/login"}
          // activeclassname="active"
          className={"link dashboard_link_item start"}
          onClick={() => handleLogout()}
          style={{ marginTop: "200px" }}
        >
          <img
            src={fileImg}
            alt="icon"
            className="dashboard_link_item_image"
            style={{ width: "30px" }}
          />
          Log Out
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
