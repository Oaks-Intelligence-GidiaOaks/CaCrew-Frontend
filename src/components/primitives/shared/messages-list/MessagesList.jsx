import React, { useEffect, useMemo, useState } from "react";
import "./MessagesList.scss";
import { SearchInput } from "components";
import { avartar } from "assets/images";
import {
  useGetAllMessagesQuery,
  useMarkAsReadMutation,
} from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { updateMessageId } from "redux/slices/message.slice";
import { useDispatch, useSelector } from "react-redux";
import timeAgo from "utils/timeAgo";
import rtkMutation from "utils/rtkMutation";

const MessagesList = () => {
  const user = useSelector((state) => state.user.user);
  // const { data: user } = useGetUserQuery();
  const [markAsRead, { isSuccess }] = useMarkAsReadMutation();
  const id = user?._id;
  const { data } = useGetAllMessagesQuery(id);
  console.log(data, "****testDa");

  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();

  const updateRead = (message) => {
    for (let item of message) {
      rtkMutation(markAsRead, item?._id);
    }
  };

  // const message = useSelector((state) => state.message);

  // const filterData = useMemo(() => {
  //   const uniqueIds = new Set();

  //   const uniqueChats = data?.reduce((chats, chat) => {
  //     const senderId = chat?.sender?._id;
  //     // const recieverId = chat.reciever._id;
  //     const chatName =
  //       senderId === user?._id ? chat?.reciever?.name : chat?.sender?.name;
  //     const chatId =
  //       senderId === user?._id ? chat?.reciever?._id : chat?.sender?._id;
  //     const messageId = chat?._id;
  //     const message = chat?.message;
  //     const time = chat?.createdAt;
  //     const chatObj = {};

  //     if (!uniqueIds.has(chatId)) {
  //       chatObj["name"] = chatName;
  //       chatObj["id"] = chatId;
  //       chatObj["message_id"] = messageId;
  //       chatObj["message"] = message;
  //       chatObj["time"] = time;
  //       chats.push(chatObj);
  //       uniqueIds.add(chatId);
  //     }
  //     // console.log(uniqueIds);
  //     return chats;
  //   }, []);

  //   return uniqueChats;
  // }, [data, user?._id]);

  // console.log(filterData, "slice");
  // console.log(uniqueIds, "ids");
  // console.log(chatObj, "obj");

  // console.log(message, "messaage");
  useEffect(() => {
    const firstMessage = data && data[0];
    const reciever =
      user?._id === firstMessage?.sender?._id
        ? firstMessage?.reciever?._id
        : firstMessage?.sender?._id;
    console.log(firstMessage, "*first");
    firstMessage &&
      dispatch(
        updateMessageId({
          chat_id: firstMessage?._id,
          reciever,
        })
      );

    // console.log(firstMessage, "first");
  }, [dispatch, data]);

  return (
    <div className="messsage_list">
      <div className="messsage_list_search_wrap">
        <SearchInput />
      </div>
      <div className="messsage_list_bg">
        <div className="messsage_list_heading sub_heading">All Messages</div>
        {data &&
          data?.map((item, idx) => {
            const name =
              user?._id === item?.sender?._id
                ? item.reciever?.name
                : item.sender?.name;

            const reciever =
              user?._id === item?.sender?._id
                ? item.reciever?._id
                : item.sender?._id;

            const unreadCount = item?.message?.filter(
              (item) => item?.read === false && user?._id === reciever
            );
            
            return (
              <a
                href="#chat"
                key={idx}
                onClick={() => {
                  dispatch(
                    updateMessageId({
                      reciever,
                      chat_id: item?._id,
                      name,
                    })
                  );
                  setTabIndex(idx);
                  updateRead(item?.message);
                }}
                className={`messsage_list_wrap between ${
                  idx === tabIndex && "messsage_list_wrap_bg"
                } link`}
              >
                <div className="messsage_list_img_text_wrap start">
                  <img src={avartar} alt="icon" className="messsage_list_img" />
                  <div className="messsage_list_text">
                    <div className="messsage_list_name">{name}</div>
                    <div className="messsage_list_last">
                      {item?.message[0]?.message}
                    </div>
                  </div>
                </div>
                <div className="messsage_list_text end col">
                  <div className="messsage_list_name_time">
                    {timeAgo(item?.message[0]?.createdAt)}
                  </div>
                  {unreadCount?.length > 0 && (
                    <div className="messsage_list_new center">
                      {unreadCount?.length}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default MessagesList;
