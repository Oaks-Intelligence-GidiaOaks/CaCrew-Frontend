import React from "react";
import "./MessageItem.scss";
import { avartar } from "assets/images";

const MessageItem = ({ send, message, time, read }) => {
    console.log(send, "**send")
  return (
    <div className={`message_item ${send ? "end" : "start"}`}>
      {!send && <img src={avartar} alt="" className="message_item_img" />}
      <div
        className={`${
          send
            ? "message_item_text_send"
            : "message_item_text_recieve"
        } end`}
      >
        <div className="message_item_message">{message}</div>
        <div className="message_item_timestatus end">
          <span className="message_item_time">{"time"}</span>
          <span className={`${read ? "message_item_read" : "message_item_unread"}`}/>
        </div>
      </div>
      {send && <img src={avartar} alt="" className="message_item_img_send" />}
    </div>
  );
};

export default MessageItem;
