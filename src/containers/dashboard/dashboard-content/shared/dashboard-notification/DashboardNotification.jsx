import React, { useState } from "react";
import "./DashboardNotification.scss";
import { DashboardNotificationBanner } from "components";
import { notif2 } from "assets/images";
import { useGetBroadcastQuery } from "services/broadcast.service";
import timeAgo from "utils/timeAgo";

const DashboardNotification = () => {
  const [expandedIds, setExpandedIds] = useState([]);
  const toggleContent = (id) => {
    setExpandedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((existingId) => existingId !== id)
        : [...prevIds, id]
    );
  };
  const getLimitedText = (text, limit = 30) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const { data: dataBroadcast } = useGetBroadcastQuery({
    // page,
    // search: searchValue,
  });
  return (
    <div className="dashboard_notification">
      <DashboardNotificationBanner />
      <div className="dashboard_notification_wrap">
        {dataBroadcast?.length >= 1 ? (
          dataBroadcast.map((row, idx) => (
            <div
              className="notification-box"
              key={row?._id || idx}
              style={{
                maxHeight: expandedIds.includes(row._id) ? "auto" : "auto",
              }}
            >
              <div className="notification-content">
                <img
                  src={row.photo_url || notif2}
                  alt="Icon"
                  className="notification-img"
                />
                <div className="notification-text-content">
                  <p className="notification-date">{timeAgo(row?.createdAt)}</p>
                  <p className="notification-title">{row.title}</p>
                  <p className="notification-text">
                    {expandedIds.includes(row._id)
                      ? row.description
                      : getLimitedText(row.description)}
                  </p>

                  <button
                    className="notification-toggle-collapse"
                    onClick={() => toggleContent(row._id)}
                  >
                    {expandedIds.includes(row._id) ? "Collapse" : "See more"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : dataBroadcast?.length < 1 ? (
          <div className="text center mt_10">No Broadcast Message yet</div>
        ) : null}
      </div>
    </div>
  );
};

export default DashboardNotification;
