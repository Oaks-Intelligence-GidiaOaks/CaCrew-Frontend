import React, { useMemo, useState } from "react";
import "./MessagesList.scss";
import { SearchInput } from "components";
import { avartar } from "assets/images";
import { useGetAllMessagesQuery } from "services/message.service";
import { useGetUserQuery } from "services/user.service";
import { updateMessageId } from "redux/slices/message.slice";
import { useDispatch, useSelector } from "react-redux";

const MessagesList = () => {
  const { data } = useGetAllMessagesQuery();
  const { data: user } = useGetUserQuery();
  const messageSlice = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const filterData = useMemo(() => {
    // store unique reciever ids
    const uniqueIds = new Set();

    const filtered = data
      ? data?.filter((item) => {
          // populate list if id is unique to Set values
          if (item?.sender?._id === user?._id) {
            if (!uniqueIds.has(item?.reciever?._id)) {
              uniqueIds.add(item?.reciever?._id);
              const obj = {};
              obj["message_id"] = item?._id;
              obj["name"] = item?.reciever?.name;
              obj["sender_id"] = item?.sender?._id;
              obj["reciever_id"] = item?.reciever?._id;
              obj["message"] = item?.message;
              return obj;
            } else {
              return false;
            }
          } else if (item?.reciever?._id === user?._id) {
            if (!uniqueIds.has(item?.sender?._id)) {
              uniqueIds.add(item?.sender?._id);
              const obj = {};
              obj["message_id"] = item?._id;
              obj["name"] = item?.reciever?.name;
              obj["sender_id"] = item?.sender?._id;
              obj["reciever_id"] = item?.reciever?._id;
              obj["message"] = item?.message;
              return obj;
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
      : [];

    console.log(uniqueIds, "ids");
    console.log(filtered, "nnn");

    return filtered;
  }, [data]);

  console.log(messageSlice, "slice");
  console.log(filterData, "filer");

  return (
    <div className="messsage_list">
      <div className="messsage_list_search_wrap">
        <SearchInput />
      </div>
      <div className="messsage_list_bg">
        <div className="messsage_list_heading sub_heading">All Messages</div>
        {filterData?.map((item) => (
          <div
            key={item?._id}
            onClick={() => {
              dispatch(
                updateMessageId({
                  message_id: item?._id,
                  sender_id: item?.sender?._id,
                  reciever_id: item?.reciever?._id,
                  isSender: user?._id === item?.sender?._id ? true : false,
                })
              );
            }}
            className={`messsage_list_wrap between ${
              messageSlice.reciever_id === item?.reciever?._id &&
              "messsage_list_wrap_bg"
            }`}
          >
            <div className="messsage_list_img_text_wrap start">
              <img src={avartar} alt="icon" className="messsage_list_img" />
              <div className="messsage_list_text">
                <div className="messsage_list_name">
                  {messageSlice.isSender
                    ? item?.reciever?.name
                    : item?.sender?.name}
                </div>
                <div className="messsage_list_last">{item?.message}</div>
              </div>
            </div>
            <div className="messsage_list_text">
              <div className="messsage_list_name">now</div>
              <div className="messsage_list_new center">2</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesList;
