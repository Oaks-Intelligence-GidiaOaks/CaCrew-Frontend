import React from "react";
import "./DashboardMessageBanner.scss";
import { message } from "assets/images";

const DashboardMessageBanner = () => {
  return (
    <div className="dash_message_banner between">
      <div className="sub_heading dash_message_banner_heading">Notifications</div>
      <div className="dash_message_banner_notify center">
        <div className="dash_message_banner_notify_wrap center">
          <img
            src={message}
            alt=""
            className="dash_message_banner_notify_img"
          />
          <span className="dash_message_banner_notify_text">Messages</span>
        </div>
        <div className="dash_message_banner_notify_wrap center">
          <img
            src={message}
            alt=""
            className="dash_message_banner_notify_img"
          />
          <span className="dash_message_banner_notify_text">Notifications</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessageBanner;
