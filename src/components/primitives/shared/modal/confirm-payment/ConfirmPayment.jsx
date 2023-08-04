import React, { useState, useRef, useEffect } from "react";
import { close, messge, verify } from "assets/images";
import { useDispatch, useSelector } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Button } from "components";
import capitalizeInitials from "utils/capitaliseInitials";
import {
  useTransactionSuccessMutation,
  usePaymentRecievedMutation,
  useGetOrgAdminQuery,
} from "services/transaction.service";
import { useSendMessageMutation } from "services/message.service";
import rtkMutation from "utils/rtkMutation";
import { updateMessageId } from "redux/slices/message.slice";
import { useNavigate } from "react-router-dom";

const ConfirmPayment = ({ data }) => {
  const [transactionSuccess, { isSuccess, isLoading, error, isError }] =
    useTransactionSuccessMutation();

  const [
    sendMessage,
    {
      isSuccess: isSuccessMessage,
      isLoading: isLoadingMessage,
      error: errorMessage,
      isError: isErrorMessage,
    },
  ] = useSendMessageMutation();

  const chatId = useSelector((state) => state.message.chat_id);
  const navigate = useNavigate()

  // get buyer id, for messaging
  const { data: id } = useGetOrgAdminQuery({ id: data?.buyer?._id });
  // console.log(id.id, "id")


  // handle snd message button functionality
  const handleSendMessage = async () => {
    id && dispatch(updateMessageId({  message_id: null, chat_id: id?.id }));

    if (chatId) {
      await rtkMutation(sendMessage, {reciever: chatId, message: " " });
    }
  };

    // console.log(chatId, "id****")

  const [
    paymentRecieved,
    {
      data: dataRecieved,
      isSuccess: isSuccessRecieved,
      isLoading: isLoadingRecieved,
      error: errorRecieved,
      isError: isErrorRecieved,
    },
  ] = usePaymentRecievedMutation();
  const dispatch = useDispatch();

  // set ref, get updated value in a callback
  const isErrorRefConfirm = useRef(isError);
  const isSuccessRefConfirm = useRef(isSuccess);
  const errorRefConfirm = useRef(error);
  const isErrorRefRecieved = useRef(isErrorRecieved);
  const isSuccessRefRecieved = useRef(isSuccessRecieved);
  const errorRefRecieved = useRef(errorRecieved);
  const dataRefRecieved = useRef(dataRecieved);

  const handleCloseModal = async () => {
    dispatch(closeComponentModal());
    // await rtkMutation(transactionConfirm, {
    //   transaction_id: transactionId,
    // });
    // isSuccessRefConfirm?.current && dispatch(closeComponentModal());
    // isErrorRefConfirm?.current &&
    //   dispatch(
    //     openModal({
    //       title: "Cancel Transaction Confirm",
    //       message:
    //         errorRefConfirm?.current?.data?.message ||
    //         "An error occured please retry",
    //     })
    //   );
  };

  const handleRecievedMade = async () => {
    await rtkMutation(paymentRecieved, {
      transaction_id: data?._id,
    });
    // isSuccessRefRecieved?.current && dispatch(closeComponentModal());
    isSuccessRefRecieved?.current &&
      (await rtkMutation(transactionSuccess, {
        transaction_id: data?._id,
      }));

    isErrorRefRecieved?.current &&
      dispatch(
        openModal({
          title: "Recieved Payment Confirmation Failed",
          message:
            errorRefRecieved?.current?.data?.message ||
            "An error occured please retry",
        })
      );
    isErrorRefConfirm?.current &&
      dispatch(
        openModal({
          title: "Transaction Not Successful ",
          message:
            errorRefConfirm?.current?.data?.message ||
            "An error occured please retry",
        })
      );
    isSuccessRefConfirm?.current &&
      dispatch(
        openModal({
          title: "Transaction Completed Successfuly",
          message:
            isSuccessRefConfirm?.current?.message ||
            "Your transaction completed successfuly",
          success: true,
        })
      );
  };

  const onSubmit = (value) => {
    console.log(value);
  };

  useEffect(() => {
    isErrorRefConfirm.current = isError;
    isSuccessRefConfirm.current = isSuccess;
    errorRefConfirm.current = error;
    isErrorRefRecieved.current = isErrorRecieved;
    isSuccessRefRecieved.current = isSuccessRecieved;
    errorRefRecieved.current = errorRecieved;
    dataRefRecieved.current = dataRecieved;
  }, [
    isError,
    isSuccess,
    error,
    isErrorRecieved,
    isSuccessRecieved,
    errorRecieved,
    dataRecieved,
  ]);

  console.log(data, "***");

  useEffect(() => {
    isErrorMessage && dispatch(openModal({
      title: "Failed To Initiate Messaging",
      message: `${errorMessage?.data?.message || "An error occured, try agiain" }`,
    }))
    isSuccessMessage && dispatch(closeComponentModal())
    isSuccessMessage && navigate("/messages")

  }, [isSuccessMessage, isErrorMessage, errorMessage])

  return (
    <div className="make_payment">
      <img
        src={close}
        alt="icon"
        className="make_payment_close"
        onClick={handleCloseModal}
      />
      <div className="make_payment_info_wrap">
        <div className="make_payment_info_initials_con between">
          <div className="make_payment_info_initials_wrap start">
            <div className="make_payment_info_initials center">
              {capitalizeInitials(data?.organization_id?.organization_name) ||
                "-"}
            </div>
            <span className="modal_buy_carb_info_bold">
              {data?.organization_id?.organization_name || "----"}
            </span>
            {data?.organization_id?.isVerified && (
              <img src={verify} alt="icon" />
            )}
          </div>
          <div className="make_payment_info_initials_contact">
            <span>Contact Buyer:</span>
            <span>{data?.organization_id?.admin_name}</span>
          </div>
        </div>
        <div className="make_payment_info_method between">
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">
              Quantity of Carbon Credit
            </div>
            <div className="make_payment_info_method_value">
              {data?.amount} tCO2e
            </div>
          </div>
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">Status</div>
            <div
              className="make_payment_info_method_value"
              style={{
                color: data?.status === "Completed" ? "green" : "#FF5151",
              }}
            >
              {data?.status}
            </div>
          </div>
          {data?.status === "Pending" && (
            <div className="make_payment_info_method_item">
              <div className="make_payment_info_method_text">
                Payment Method
              </div>
              <div className="make_payment_info_method_value">
                Bank transfer
              </div>
            </div>
          )}
        </div>
        <div className="make_payment_details">
          <div className="make_payment_details_title">Payment details</div>
          <div className="make_payment_details_message between">
            {data?.status === "Pending" && (
              <div className="make_payment_details_message_seller start" onClick={handleSendMessage}>
                <img src={messge} alt="icon" />
                <span>{isLoadingMessage ? "Sending..." : "Message Buyer"} </span>
              </div>
            )}
            {data?.status !== "Pending" && (
              <div className="make_payment_details_message_seller_text">
                <span className="make_payment_details_message_seller_text_small">
                  {" "}
                  Transaction fee:{" "}
                </span>
                <span className="make_payment_details_message_seller_text_big">
                  {" "}
                  {Math.ceil(data?.amount * 0.015)}
                  {" tCO2e"}
                </span>
              </div>
            )}
            {data?.status === "Pending" && (
              <div className="make_payment_details_message_seller_text">
                <span className="make_payment_details_message_seller_text_small">
                  {" "}
                  Amount:{" "}
                </span>
                <span className="make_payment_details_message_seller_text_big">
                  {" "}
                  ${data?.amount}{" "}
                </span>
              </div>
            )}
          </div>
        </div>
        {data?.status === "Pending" && (
          <div className="make_payment_btn_wrap end">
            <Button
              text={"Cancel"}
              className={"make_payment_btn_two"}
              onClick={handleCloseModal}
              loading={isLoading}
            />
            <Button
              text={"I Have Recieved Payment"}
              className={"make_payment_btn"}
              onClick={handleRecievedMade}
              loading={isLoadingRecieved}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPayment;
