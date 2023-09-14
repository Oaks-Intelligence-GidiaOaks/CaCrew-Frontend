import React, { useEffect, useState, useRef } from "react";
import "./Notification.scss";
import { message as messageIcon } from "assets/images";
import { Link } from "react-router-dom";
import {
  useGetNotificationQuery,
  useMarkNotificationAsReadMutation,
} from "services/notification.service";
import timeAgo from "utils/timeAgo";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const { data: dataNotification, refetch } = useGetNotificationQuery({
    // page,
    // search: searchValue,
  });

  const [markAsRead] = useMarkNotificationAsReadMutation();

  const handleNotificationClick = (id) => {
    markAsRead({ id });
    refetch();
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowNotifications((prev) => !prev);
  };

  // Update the unreadCount based on localNotifications state
  const unreadCount = dataNotification
    ? dataNotification.filter((notif) => !notif.isRead).length
    : 0;

  return (
    <div className="notification-container">
      <img
        src={messageIcon}
        alt="icon"
        className="dashboard_icon"
        onClick={toggleDropdown}
      />
      {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
      {showNotifications && (
        <div className="notification-dropdown" ref={dropdownRef}>
          {unreadCount > 0 ? (
            dataNotification
              .filter((notif) => !notif.isRead)
              .map((row) => (
                <Link
                  key={row._id}
                  to={
                    row.type === "Broadcast Notification"
                      ? "/notifications"
                      : "/messages"
                  }
                  className="notification-item"
                  onClick={() => handleNotificationClick(row._id)}
                >
                  <p className="notif-date">{timeAgo(row.createdAt)}</p> <br />
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
