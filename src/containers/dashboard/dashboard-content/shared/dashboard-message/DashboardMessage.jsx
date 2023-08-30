import React, { useState } from "react";
import "./DashboardMessage.scss";
import {
  DashboardMessageBanner,
  MessagesList,
  ViewMessages,
  SendMessage,
} from "components";

const DashboardMessage = () => {
  const [showMessages, setShowMessages] = useState(false);
  console.log(showMessages, "show");
  return (
    <div className="dashboard_message">
      <DashboardMessageBanner />
      <div className="dashboard_message_wrap between">
        <div
          className={`dashboard_message_list ${
            showMessages && "hide_dashboard_message_list"
          }`}
        >
          <MessagesList
            setShowMessages={setShowMessages}
            showMessages={showMessages}
          />
        </div>
        <div
          className={`dashboard_message_view ${
            showMessages && "show_dashboard_message_view"
          }`}
        >
          <ViewMessages
            setShowMessages={setShowMessages}
            showMessages={showMessages}
          />
          <div className="dashboard_message_view_send">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessage;
