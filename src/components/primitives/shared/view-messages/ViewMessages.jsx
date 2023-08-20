import { support } from "assets/images";
import "./ViewMessages.scss";
import React, { useEffect } from "react";
import { MessageItem, Shimmer } from "components";
import { useGetMessageQuery } from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { useSelector } from "react-redux";

const ViewMessages = () => {
  const chatId = useSelector((store) => store.message.chat_id);
  const skipQuery = chatId === null || chatId === undefined ? true : false;
  const { data, isLoading } = useGetMessageQuery(chatId, {
    skip: skipQuery,
    // pollingInterval: 1000,
  });
  const { data: user } = useGetUserQuery();
  console.log(chatId, "message");

  useEffect(() => {
    console.log(null);
  }, [chatId]);

  return (
    <div className="view_message">
      <div className="view_message_banner start">
        <img src={support} alt="icon" className="view_message_banner_img" />
        <div className="view_message_banner_text">Cabornible Support</div>
        <div className="view_message_banner_online" />
      </div>
      <div className="view_message_wrap center">
        <div className="view_message_time">Today</div>
        <div className="view_message_all">
          {!isLoading
            ? data?.map((item) => (
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
