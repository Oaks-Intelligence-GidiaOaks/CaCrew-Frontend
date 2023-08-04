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
import { clearFormData } from "redux/slices/register.slice";

const DashboardSidebar = () => {
  const [pathname, setPathName] = useState();
  const location = useLocation();
  // const user = JSON.parse(localStorage.getItem("user"));

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // console.log(user?.organization_id?.isVerified)

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearFormData())
  };

  return (
    <div className="dashboard_sidebar_wrap">
      {!user?.organization_id?.isVerified && (
        <div className="dashboard_sidebar_blocked">
          <div className="dashboard_sidebar_blocked_text center text">
            You are not yet activated
          </div>
        </div>
      )}
      <div className="dashboard_link_items_wrap center col">
        <NavLink
          to={"/"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
          // style={{zIndex: "3"}}
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
          Carbon Wallet
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
          Document Center
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
            Organisation
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
                pathname?.includes("dashboard-track-project")
                  ? trackproj
                  : trackprojblue
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
          to={"/messages"}
          activeclassname="active"
          className={"link dashboard_link_item start"}
        >
          <img
            src={pathname === "/dashboard-staff" ? staffwhite : staffblue}
            alt="icon"
            className="dashboard_link_item_image"
          />
          Notification
        </NavLink>
        <NavLink
          to={"/login"}
          // activeclassname="active"
          className={"link dashboard_link_item start"}
          onClick={() => handleLogout()}
          style={{ marginTop: "0px", zIndex: "3" }}
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
