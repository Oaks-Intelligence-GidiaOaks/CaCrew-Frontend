import React, { useEffect, useMemo, useState } from "react";
import "./MessagesList.scss";
import { SearchInput } from "components";
import { avartar } from "assets/images";
import { useGetAllMessagesQuery } from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { updateMessageId } from "redux/slices/message.slice";
import { useDispatch, useSelector } from "react-redux";
import timeAgo from "utils/timeAgo";

const MessagesList = () => {
  const { data } = useGetAllMessagesQuery("getAllMessage", { pollingInterval: 1000 });
  const { data: user } = useGetUserQuery();

  const [tabIndex, setTabIndex] = useState(0);

  const dispatch = useDispatch();
  // const message = useSelector((state) => state.message);

  const filterData = useMemo(() => {
    const uniqueIds = new Set();

    const uniqueChats = data?.reduce((chats, chat) => {
      const senderId = chat?.sender?._id;
      // const recieverId = chat.reciever._id;
      const chatName =
        senderId === user?._id ? chat?.reciever?.name : chat?.sender?.name;
      const chatId =
        senderId === user?._id ? chat?.reciever?._id : chat?.sender?._id;
      const messageId = chat?._id;
      const message = chat?.message;
      const time = chat?.createdAt;
      const chatObj = {};

      if (!uniqueIds.has(chatId)) {
        chatObj["name"] = chatName;
        chatObj["id"] = chatId;
        chatObj["message_id"] = messageId;
        chatObj["message"] = message;
        chatObj["time"] = time;
        chats.push(chatObj);
        uniqueIds.add(chatId);
      }
      // console.log(uniqueIds);
      return chats;
    }, []);

    return uniqueChats;
  }, [data, user?._id]);

  // console.log(filterData, "slice");
  // console.log(uniqueIds, "ids");
  // console.log(chatObj, "obj");

  // console.log(message, "messaage"); 
  useEffect(() => {
    const firstMessage = filterData && filterData[0];
    firstMessage &&
      dispatch(
        updateMessageId({
          message_id: firstMessage?.message_id,
          chat_id: firstMessage?.id,
        })
      );

    // console.log(firstMessage, "first");
  }, [filterData, dispatch]);

  return (
    <div className="messsage_list">
      <div className="messsage_list_search_wrap">
        <SearchInput />
      </div>
      <div className="messsage_list_bg">
        <div className="messsage_list_heading sub_heading">All Messages</div>
        {filterData &&
          filterData?.map((item, idx) => (
            <a
              href="#chat"
              key={idx}
              onClick={() => {
                dispatch(
                  updateMessageId({
                    message_id: item?.message_id,
                    chat_id: item?.id,
                  })
                );
                setTabIndex(idx);
              }}
              className={`messsage_list_wrap between ${
                idx === tabIndex && "messsage_list_wrap_bg"
              } link`}
            >
              <div className="messsage_list_img_text_wrap start">
                <img src={avartar} alt="icon" className="messsage_list_img" />
                <div className="messsage_list_text">
                  <div className="messsage_list_name">{item?.name}</div>
                  <div className="messsage_list_last">{item?.message}</div>
                </div>
              </div>
              <div className="messsage_list_text">
                <div className="messsage_list_name">{timeAgo(item?.time)}</div>
                <div className="messsage_list_new center">2</div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};

export default MessagesList;
