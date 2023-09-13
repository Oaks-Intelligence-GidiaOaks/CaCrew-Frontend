import React, { useState } from "react";
import "./Notification.scss";
import { message } from "assets/images";
import { Link } from "react-router-dom";
import { useGetNotificationQuery } from "services/notification.service";
import timeAgo from "utils/timeAgo";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const { data: dataNotification } = useGetNotificationQuery({
    // page,
    // search: searchValue,
  });

  return (
    <div className="notification-container">
      <img
        src={message}
        alt="icon"
        className="dashboard_icon"
        onClick={toggleNotifications}
      />
      {showNotifications && (
        <div className="notification-dropdown">
          {dataNotification?.length >= 1 ? (
            dataNotification.map((row, idx) => (
              <Link key={row?._id || idx} to="#" className="notification-item">
                <p className="notif-date">{timeAgo(row?.createdAt)}</p> <br />
                {row.message}
              </Link>
            ))
          ) : (
            <div className="notification-item">No notification yet</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;
