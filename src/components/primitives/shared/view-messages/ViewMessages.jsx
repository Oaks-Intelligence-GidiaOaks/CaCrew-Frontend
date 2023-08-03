import { support } from "assets/images";
import "./ViewMessages.scss";
import React, { useEffect } from "react";
import { MessageItem } from "components";
import { useGetMessageQuery } from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { useSelector } from "react-redux";

const ViewMessages = () => {
  const recieverId = useSelector((store) => store.message.reciever_id);
  const skipQuery = recieverId === null ? true : false;
  const { data } = useGetMessageQuery(recieverId, { skip: skipQuery });
  const { data: user } = useGetUserQuery();
  console.log(recieverId, "message");

  useEffect(() => {
    console.log(null);
  }, [recieverId]);

  return (
    <div className="view_message">
      <div className="view_message_banner start">
        <img src={support} alt="icon" className="view_message_banner_img" />
        <div className="view_message_banner_text">CaCrew Support</div>
        <div className="view_message_banner_online" />
      </div>
      <div className="view_message_wrap center">
        <div className="view_message_time">Today</div>
        <div className="view_message_all">
          {data &&
            data?.map((item) => (
              <div key={item?._id}>
                <MessageItem
                  send={user?._id === item?.sender?._id}
                  message={item?.message}
                  read={item?.read}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMessages;
