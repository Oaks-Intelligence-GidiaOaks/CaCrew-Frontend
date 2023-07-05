import React, { useState } from "react";
import "./DashboardStaffCard.scss";
import {
  assign,
  avartar,
  call,
  crown,
  crownstaff,
  deletestaff,
  dots,
  sms,
} from "assets/images";

const DashboardStaffCard = ({ data }) => {
  const [close, setClose] = useState(true);

  const handleOptionOpen = () => {
    setClose(!close);
  };
  return (
    <div className="dashboard_staff_card">
      <div className="dashboard_staff_card_detail_wrap between">
        <div className="dashboard_staff_card_detail start">
          <img
            src={avartar}
            alt="icon"
            className="dashboard_staff_card_detail_img"
          />
          <div className="dashboard_staff_card_detail_namepos">
            <div className="dashboard_staff_card_detail_name">{data?.name}</div>
            <div className="dashboard_staff_card_detail_position">
              {data?.role === ("SuperAdmin" || "OrgAdmin")
                ? "Admin"
                : data?.designation}
            </div>
          </div>
        </div>
        <div
          className="dashboard_staff_card_detail_options center"
          onClick={handleOptionOpen}
        >
          <img
            src={dots}
            alt="icon"
            className="dashboard_staff_card_detail_options_img"
          />
        </div>
        <div
          className={`dashboard_staff_card_detail_options_open ${
            close && "dashboard_staff_card_detail_options_close"
          }`}
        >
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            onClick={handleOptionOpen}
          >
            <img
              src={assign}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Assign a project
            </span>
          </div>
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            onClick={handleOptionOpen}
          >
            <img
              src={crownstaff}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Make Admin
            </span>
          </div>
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            style={{ border: "none" }}
            onClick={handleOptionOpen}
          >
            <img
              src={deletestaff}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Remove Staff
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard_staff_card_contact start">
        <img
          src={sms}
          alt="icon"
          className="dashboard_staff_card_contact_img"
        />
        <div className="dashboard_staff_card_contact_namepos">
          <div className="dashboard_staff_card_contact_name">{data?.email}</div>
        </div>
      </div>
      <div className="dashboard_staff_card_contact start">
        <img
          src={call}
          alt="icon"
          className="dashboard_staff_card_contact_img"
        />
        <div className="dashboard_staff_card_contact_namepos">
          <div className="dashboard_staff_card_contact_name">
            {data?.phone_number}
          </div>
        </div>
      </div>
      {(data?.role === "SuperAdmin" || data?.role === "OrgAdmin") && (
        <div className="dashboard_staff_card_admin center">
          <img
            src={crown}
            alt="icon"
            className="dashboard_staff_card_admin_img"
          />
          <span className="dashboard_staff_card_admin_text">Admin</span>
        </div>
      )}
    </div>
  );
};

export default DashboardStaffCard;
