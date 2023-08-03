import React, { useEffect } from "react";
import "./SendMessage.scss";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { attach } from "assets/images";
import { useSendMessageMutation } from "services/message.service";
import rtkMutation from "utils/rtkMutation";
import { useSelector } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useDispatch } from "react-redux";

const SendMessage = () => {
  const recieverId = useSelector((store) => store.message.reciever_id);
  const skipQuery = recieverId === null ? true : false;
  const [sendMessageMutation, { data, isError, isLoading, isSuccess, error }] =
    useSendMessageMutation({ skip: skipQuery });

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    values["reciever"] = recieverId;
    await rtkMutation(sendMessageMutation, values);
    // console.log(values);
  };

  useEffect(() => {
    isError &&
      dispatch(
        openModal({
          title: "Message not sent",
          message: `${
            error?.data?.message ||
            "An error occured while trying to send message"
          }`,
        })
      );
  }, [isError]);

  return (
    <div className="send_message">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit} className="send_message start">
            <div className="send_message_input">
              <Field
                name="message"
                component={Input}
                placeholder={"Type a message..."}
              />
            </div>
            <div className="send_message_attach_wrap">
              <img
                src={attach}
                alt="icon"
                className="send_message_attach_img"
              />
              <Field
                name="document"
                render={({ input }) => (
                  <input
                    {...input}
                    className="send_message_attach"
                    type="file"
                    accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                )}
              />
            </div>
            <Button
              text={"send"}
              type={"submit"}
              className={"send_message_btn"}
              loading={isLoading}
            />
          </form>
        )}
      />
    </div>
  );
};

export default SendMessage;
