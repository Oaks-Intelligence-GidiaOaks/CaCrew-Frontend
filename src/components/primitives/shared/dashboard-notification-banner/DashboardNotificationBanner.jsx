import React from "react";
import "../dashboard-message-banner/DashboardMessageBanner.scss";
import { message, notification } from "assets/images";

const DashboardNotificationBanner = () => {
  return (
    <div className="dash_message_banner between">
      <div className="sub_heading dash_message_banner_heading">
        Notifications
      </div>
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
            src={notification}
            alt=""
            className="dash_message_banner_notify_img"
          />
          <span className="dash_message_banner_notify_text">
            &nbsp;Notifications
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNotificationBanner;
