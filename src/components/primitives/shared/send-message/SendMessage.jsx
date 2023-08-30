import React, { useEffect, useRef, useState } from "react";
import "./SendMessage.scss";
import { Form, Field } from "react-final-form";
import { Button, Input, Upload } from "components";
import { attach, close } from "assets/images";
import { useSendMessageMutation } from "services/message.service";
import rtkMutation from "utils/rtkMutation";
import { useSelector } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useDispatch } from "react-redux";
import fileTypeReader from "utils/fileTypeReader";

const SendMessage = () => {
  // state to toggle document upload component
  const [showUpload, setShowUpload] = useState(false);

  // sellect message reciever id from store
  const recieverId = useSelector((store) => store.message.reciever);

  // skip query if recieverId is null
  const skipQuery =
    recieverId === null || recieverId === undefined ? true : false;
  const [sendMessageMutation, { isError, isLoading, isSuccess, error }] =
    useSendMessageMutation({ skip: skipQuery });

  // Use ref to update success state in call back/ this was done because of js closure..not the best approach
  const isSuccessSendMessageRef = useRef(isSuccess);

  const dispatch = useDispatch();

  const onSubmit = async (values, form) => {
    values["reciever"] = recieverId;
    const file = values.document;

    if (file) {
      await new Promise((resolve) => {
        fileTypeReader(file, (object) => {
          values["document"] = object;
          resolve();
        });
      });
    }

    await rtkMutation(sendMessageMutation, values);
    isSuccessSendMessageRef.current && form.initialize({});
    isSuccessSendMessageRef.current && setShowUpload(false)
    console.log(values);
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

  // force a rerender
  useEffect(() => {
    isSuccessSendMessageRef.current = isSuccess;
  }, [isSuccess]);

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
            {showUpload && (
              <div className="send_message_upload">
                <Upload documentName={"document"} removeValidation={true}/>
              </div>
            )}
            <div className="send_message_attach_wrap">
              <img
                src={showUpload ? close : attach}
                alt="icon"
                className="send_message_attach_img"
                onClick={() => setShowUpload(!showUpload)}
              />
              {/* <Field
                name="document"
                render={({ input }) => (
                  <input
                    {...input}
                    className="send_message_attach"
                    type="file"
                    accept="image/jpeg,image/png,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  />
                )}
              /> */}
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
