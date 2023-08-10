import React, { useEffect, useRef } from "react";
import "./ConfirmRetireCredit.scss"
import { Button } from "components";
import { closeComponentModal, closeModal } from "redux/slices/modal.slice";
import { close } from "assets/images";
import { useRetireCarbonCreditMutation } from "services/transaction.service";
import rtkMutation from "utils/rtkMutation";
import { openModal } from "redux/slices/modal.slice";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "services/user.service";

const ConfirmRetireCredit = ({ data }) => {
  const [retireCarbonCredit, { error, isError, isSuccess, isLoading }] =
    useRetireCarbonCreditMutation();

    const {data: user} = useGetUserQuery()

  // create ref values, need to update state inside a callback
  const isSuccessRef = useRef(isSuccess);
  const isErrorRef = useRef(isError);
  const errorRef = useRef(error);

  const dispatch = useDispatch();

  const onSubmit = async () => {
    // const {...copy} = data;
    // copy["organization"] = user?.organization_id?.organization_name
    // console.log(copy, "data");

    await rtkMutation(retireCarbonCredit, data);
    isSuccessRef.current && dispatch(closeComponentModal())
    isSuccessRef.current &&
      dispatch(
        openModal({
          title: "Carbon Credit Retired Successfuly",
          message: `You have successfuly retired ${data?.amount} tCO2e`,
          success: true,
        })
      );

    isErrorRef.current &&
      dispatch(
        openModal({
          title: `Retire Credit ${data?.amount} tCO2e failed`,
          message: `${
            errorRef?.current?.data?.message ||
            "An error occured, please try again"
          } `
        })
      );
  };


  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  useEffect(() => {
    isSuccessRef.current = isSuccess;
    isErrorRef.current = isError;
    errorRef.current = error;
  }, [isSuccess, isError, error]);

  return (
    <div className="retire">
      <img
        src={close}
        alt="icon"
        className="retire_close"
        onClick={handleCloseModal}
      />
      <div className="retire_info_wrap">
        <div className="retire_info_initials_con between">
          <div className="sub_heading start">
              Retire Carbon Credit
          </div>
        </div>
        <div className="retire_info_method between">
          <div className="retire_info_method_item">
            <div className="retire_info_method_text">
              Retirement Wallet
            </div>
            <div className="retire_info_method_value">
              {data?.wallet_type || "-"}
            </div>
          </div>
          <div className="retire_info_method_item">
            <div className="retire_info_method_text">Wallet Balance</div>
            <div
              className="retire_info_method_value"
            >
              {data?.wallet_type === "Close" ? user?.wallet_id?.close_balance : user?.wallet_id?.open_balance  + " tCO2e"|| "-"}
            </div>
          </div>

            <div className="retire_info_method_item_noboder">
              <div className="retire_info_method_text">
                Amount
              </div>
              <div className="retire_info_method_value">
                {data?.amount || "-"} {" tCO2e"}
              </div>
            </div>
        </div>
        <div className="retire_details">
          <div className="retire_details_title">Summary</div>
          <div className="retire_details_message between">
              <div className="retire_details_message_seller_text">
                <span className="retire_details_message_seller_text_small">
                  {" "}
                  Total CO2e Offset{" "}
                </span>
                {/* <span className="retire_details_message_seller_text_big">
                  {" "}
                  {data?.amount || "-"}
                  {" tCO2e"}
                </span> */}
              </div>
              <div className="retire_details_message_seller_text">
                <span className="retire_details_message_seller_text_small">
                  {" "}
                  Amount:{" "}
                </span>
                <span className="retire_details_message_seller_text_big">
                  {" "}
                  {data?.amount}{" tCO2e"}
                </span>
              </div>
          </div>
          <div className="retire_details_message between">
              <div className="retire_details_message_seller_text">
                <span className="retire_details_message_seller_text_small">
                  {" "}
                  Transaction fee{" "}
                </span>
                {/* <span className="retire_details_message_seller_text_big">
                  {" "}
                  {data?.amount || "-"}
                  {" tCO2e"}
                </span> */}
              </div>
              <div className="retire_details_message_seller_text">
                {/* <span className="retire_details_message_seller_text_small">
                  {" "}
                  Fee:{" "}
                </span> */}
                <span className="retire_details_message_seller_text_big">
                  {" "}
                  {Math.ceil(data?.amount * 0.015)}{" tCO2e"}
                </span>
              </div>
          </div>
        </div>
          <div className="retire_btn_wrap end">
            <Button
              text={"Cancel"}
              className={"retire_btn_two"}
                onClick={handleCloseModal}
              //   loading={isLoading}
            />
            <Button
              text={"Retire to Offset"}
              className={"retire_btn"}
                onClick={onSubmit}
                loading={isLoading}
            />
          </div>
      </div>
    </div>
  );
};

export default ConfirmRetireCredit;
