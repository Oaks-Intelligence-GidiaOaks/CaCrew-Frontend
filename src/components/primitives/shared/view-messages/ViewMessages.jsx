import { support } from "assets/images";
import "./ViewMessages.scss";
import React, { useEffect } from "react";
import { MessageItem, Shimmer } from "components";
import { useGetMessageQuery } from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { useSelector } from "react-redux";

const ViewMessages = () => {
  const { data: user } = useGetUserQuery();
  const message = useSelector((store) => store.message);
  const skipQuery =
    message.chat_id === null || message.chat_id === undefined ? true : false;
  const { data, isLoading } = useGetMessageQuery({
    skip: skipQuery,
    userId: user?._id,
    id: message.chat_id,
    // pollingInterval: 1000,
  });

  // const data = typeof messages === "object" ? [] : messages;
  // console.log(messages, "*message");
  // console.log(data && Array.from(data), "*message");

  return (
    <div className="view_message">
      <div className="view_message_banner start">
        <img src={support} alt="icon" className="view_message_banner_img" />
        <div className="view_message_banner_text">{message.name || " "}</div>
        <div className="view_message_banner_online" />
      </div>
      <div className="view_message_wrap center">
        <div className="view_message_time">Today</div>
        <div className="view_message_all">
          {!isLoading
            ? data &&
              Array.from(data)?.map((item) => (
                <>
                  {item?.message !== " " && (
                    <div key={item?._id}>
                      <MessageItem
                        send={user?._id === item?.sender?._id}
                        message={item?.message}
                        read={item?.read}
                        time={item?.createdAt}
                      />
                    </div>
                  )}
                </>
              ))
            : [1, 2, 3, 4, 5, 6].map((_, idx) => (
                <div className="mb_10">
                  <Shimmer height={"40px"} />
                </div>
              ))}
          <div id="chat" />
        </div>
      </div>
    </div>
  );
};

export default ViewMessages;
