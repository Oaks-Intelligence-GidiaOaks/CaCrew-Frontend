import React, { useState } from "react";
import "./DashboardMessage.scss";
import { DashboardMessageBanner, MessagesList, ViewMessages, SendMessage } from "components";

const DashboardMessage = () => {
  return (
    <div className="dashboard_message">
      <DashboardMessageBanner />
      <div className="dashboard_message_wrap between">
        <div className="dashboard_message_list">
          <MessagesList />
        </div>
        <div className="dashboard_message_view">
          <ViewMessages />
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default DashboardMessage;
