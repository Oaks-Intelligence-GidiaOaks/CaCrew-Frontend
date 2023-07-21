import React, { useState, useRef, useEffect } from "react";
import "./MakePayment.scss";
import { close, messge, verify } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Button } from "components";
import capitalizeInitials from "utils/capitaliseInitials";
import {
  useTransactionFailedMutation,
  usePaymentMadeMutation,
} from "services/transaction.service";
import rtkMutation from "utils/rtkMutation";

const MakePayment = ({ data, amount, transactionId }) => {
  const [transactionFailed, { isSuccess, isLoading, error, isError }] =
    useTransactionFailedMutation();

  const [
    paymentMade,
    {
      data: dataPayment,
      isSuccess: isSuccessPayment,
      isLoading: isLoadingPayment,
      error: errorPayment,
      isError: isErrorPayment,
    },
  ] = usePaymentMadeMutation();
  const dispatch = useDispatch();

  // set ref, get updated value in a callback
  const isErrorRefFailed = useRef(isError);
  const isSuccessRefFailed = useRef(isSuccess);
  const errorRefFailed = useRef(error);
  const isErrorRefPayment = useRef(isErrorPayment);
  const isSuccessRefPayment = useRef(isSuccessPayment);
  const errorRefPayment = useRef(errorPayment);
  const dataRefPayment = useRef(dataPayment);

  const handleCancelTransaction = async () => {
    await rtkMutation(transactionFailed, {
      transaction_id: transactionId,
    });
    isSuccessRefFailed?.current && dispatch(closeComponentModal());
    isErrorRefFailed?.current &&
      dispatch(
        openModal({
          title: "Cancel Transaction Failed",
          message:
            errorRefFailed?.current?.data?.message ||
            "An error occured please retry",
        })
      );
  };

  const handleCloseModal = () => {
    dispatch(closeComponentModal())
  }

  const handlePaymentMade = async () => {
    await rtkMutation(paymentMade, {
      transaction_id: transactionId,
    });
    isSuccessRefPayment?.current && dispatch(closeComponentModal());
    isErrorRefPayment?.current &&
      dispatch(
        openModal({
          title: "Payment Confirmation Failed",
          message:
            errorRefPayment?.current?.data?.message ||
            "An error occured please retry",
        })
      );
    isSuccessRefPayment?.current &&
      dispatch(
        openModal({
          title: "Payment Confirmation Success",
          message:
            dataPayment?.current?.message || "Your payment has been confirmed to seller",
          success: true,
        })
      );
  };

  const onSubmit = (value) => {
    console.log(value);
  };

  useEffect(() => {
    isErrorRefFailed.current = isError;
    isSuccessRefFailed.current = isSuccess;
    errorRefFailed.current = error;
    isErrorRefPayment.current = isErrorPayment;
    isSuccessRefPayment.current = isSuccessPayment;
    errorRefPayment.current = errorPayment;
    dataRefPayment.current = dataPayment;
  }, [
    isError,
    isSuccess,
    error,
    isErrorPayment,
    isSuccessPayment,
    errorPayment,
    dataPayment,
  ]);

  // console.log( data, "***");

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
            <span>Contact Seller:</span>
            <span>{data?.organization_id?.admin_name}</span>
          </div>
        </div>
        <div className="make_payment_info_method between">
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">
              Quantity of Carbon Credit
            </div>
            <div className="make_payment_info_method_value">{amount} tCO2e</div>
          </div>
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">
              Time left to make payment
            </div>
            <div
              className="make_payment_info_method_value"
              style={{ color: "#FF5151" }}
            >
              00: 02 :53
            </div>
          </div>
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">Payment Method</div>
            <div className="make_payment_info_method_value">Bank transfer</div>
          </div>
        </div>
        <div className="make_payment_details">
          <div className="make_payment_details_title">Payment details</div>
          <div className="make_payment_details_info between">
            <div className="make_payment_details_info_item">
              <div className="make_payment_details_info_text">Account Name</div>
              <div className="make_payment_details_info_value">
                Agroventure Kapital Limited
              </div>
            </div>
            <div className="make_payment_details_info_item">
              <div className="make_payment_details_info_text">
                Account Number
              </div>
              <div className="make_payment_details_info_value">3426245267</div>
            </div>
            <div className="make_payment_details_info_item">
              <div className="make_payment_details_info_text">Bank Name</div>
              <div className="make_payment_details_info_value">
                United Bank of Oaks Intelligence
              </div>
            </div>
          </div>
          <div className="make_payment_details_message between">
            <div className="make_payment_details_message_seller start">
              <img src={messge} alt="icon" />
              <span> Message Seller</span>
            </div>
            <div className="make_payment_details_message_seller_text">
              <span className="make_payment_details_message_seller_text_small">
                {" "}
                Pay the Seller:{" "}
              </span>
              <span className="make_payment_details_message_seller_text_big">
                {" "}
                ${" "}{amount}
              </span>
            </div>
          </div>
        </div>
        {data?.status === "Pending" && (
          <div className="make_payment_btn_wrap end">
            <Button
              text={"Cancel"}
              className={"make_payment_btn_two"}
              onClick={handleCancelTransaction}
              loading={isLoading}
            />
            <Button
              text={"I Have Made Payment"}
              className={"make_payment_btn"}
              onClick={handlePaymentMade}
              loading={isLoadingPayment}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MakePayment;
