import React from "react";
import "./MessageItem.scss";
import { avartar, fileImg } from "assets/images";
import timeAgo from "utils/timeAgo";
import getFileDetails from "utils/getFileDetails";

const MessageItem = ({ send, message, time, read, document }) => {
  // console.log(send, "**send")
  const {image, name} = document && getFileDetails(document)
  return (
    <>
      {document ? (
        <div className={`message_item ${send ? "end" : "start"}`}>
          {!send && <img src={avartar} alt="" className="message_item_img" />}
          <div
            className={`${
              send ? "message_item_text_send" : "message_item_text_recieve"
            } `}
          >
            <a
              href={document}
              className={`${
                send ? "message_item_file_send" : "message_item_file_recieve"
              } between link`}
            >
              <div className="message_item_file_text">
                {name}
              </div>
              <img src={image} alt="file" className="message_item_file_img" />
            </a>
            <div className="message_item_message">{message}</div>
            <div className="message_item_timestatus end">
              <span className="message_item_time">{timeAgo(time)}</span>
              <span
                className={`${
                  read ? "message_item_read" : "message_item_unread"
                }`}
              />
            </div>
          </div>
          {send && (
            <img src={avartar} alt="" className="message_item_img_send" />
          )}
        </div>
      ) : (
        <div className={`message_item ${send ? "end" : "start"}`}>
          {!send && <img src={avartar} alt="" className="message_item_img" />}
          <div
            className={`${
              send ? "message_item_text_send" : "message_item_text_recieve"
            }`}
          >
            <div className="message_item_message">{message}</div>
            <div className="message_item_timestatus end">
              <span className="message_item_time">{timeAgo(time)}</span>
              <span
                className={`${
                  read ? "message_item_read" : "message_item_unread"
                }`}
              />
            </div>
          </div>
          {send && (
            <img src={avartar} alt="" className="message_item_img_send" />
          )}
        </div>
      )}
    </>
  );
};

export default MessageItem;
