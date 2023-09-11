import React, { useState } from "react";
import "./DashboardNotification.scss";
import { DashboardNotificationBanner } from "components";
import { notificationImg, notif1, notif2 } from "assets/images";

const DashboardNotification = () => {
  return (
    <div className="dashboard_notification">
      <DashboardNotificationBanner />
      <div className="dashboard_notification_wrap">
        <div className="notification-box">
          <div className="notification-content">
            <img src={notif1} alt="Icon" className="notification-img" />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">Limited Time Offer</p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>

        <div className="notification-box">
          <div className="notification-content">
            <img
              src={notificationImg}
              alt="Icon"
              className="notification-img"
            />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">Limited Time Offer</p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>

        <div className="notification-box">
          <div className="notification-content">
            <img src={notif2} alt="Icon" className="notification-img" />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">
                Reminder: Submit Your Emission Reports
              </p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>

        <div className="notification-box">
          <div className="notification-content">
            <img src={notif1} alt="Icon" className="notification-img" />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">New Feature Alert</p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>

        <div className="notification-box">
          <div className="notification-content">
            <img
              src={notificationImg}
              alt="Icon"
              className="notification-img"
            />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">Limited Time Offer</p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>

        <div className="notification-box">
          <div className="notification-content">
            <img src={notif2} alt="Icon" className="notification-img" />
            <div className="notification-text-content">
              <p className="notification-date">Jun 6 2023, 9:42am</p>
              <p className="notification-title">
                Reminder: Submit Your Emission Reports
              </p>
              <p className="notification-text">
                We are thrilled to offer you a limited-time opportunity to
                purchase carbon credits at exclusive discounted rates! Take
                advantage of this offer to offset your organization's emissions
                and make a significant impact on the environment.
              </p>
              <button className="notification-toggle-collapse">See more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNotification;
