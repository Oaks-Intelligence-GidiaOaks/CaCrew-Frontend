import React, { useState, useRef, useEffect } from "react";
import "./VerifyOtp.scss";
import { close } from "assets/images";
import { Button, OtpInput } from "components";
import { closeComponentModal } from "redux/slices/modal.slice";
import { openModal } from "redux/slices/modal.slice";
import { useDispatch } from "react-redux";
import { useSendCreditMutation } from "services/user.service";
import { useVerifyOtpMutation } from "services/transaction.service";
import { useGetUserQuery } from "services/user.service";
import { formatErrorResponse } from "utils/formatErrorResponse";
import rtkMutation from "utils/rtkMutation";

const VerifyOtp = ({ data }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpValue, setOtpValue] = useState(null);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeComponentModal());
  };

  const { data: user } = useGetUserQuery();

  const [
    sendCredit,
    {
      data: carbonData,
      isSuccess: isSuccessCredit,
      isLoading: loading,
      isError: isErrorCredit,
      error: errorCredit,
    },
  ] = useSendCreditMutation();
  const [
    verifyOtp,
    {
      isSuccess: isSuccessOtp,
      isLoading: loadingOtp,
      isError: isErrorOtp,
      error: errorOtp,
    },
  ] = useVerifyOtpMutation();

  const handleSendCredit = () => {
    rtkMutation(verifyOtp, { otp: otpValue });
  };

  // Update the otp state when an input changes
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  useEffect(() => {
    setOtpValue(otp.join(""));
  }, [otp]);

  useEffect(() => {
    isSuccessCredit &&
      dispatch(
        openModal({
          title: "Carbon Credited Status",
          message: `${carbonData?.message}`,
          success: true,
        })
      );

    isSuccessCredit && dispatch(closeComponentModal());

    isErrorCredit &&
      dispatch(
        openModal({
          title: "Carbon Crediting Failed",
          message: `${
            formatErrorResponse(errorCredit) ||
            "An error occured please try again later"
          }`,
        })
      );

    isErrorOtp &&
      dispatch(
        openModal({
          title: "OTP vrification Failed",
          message: `${
            formatErrorResponse(errorOtp) ||
            "An error occured please try again later"
          }`,
        })
      );
  }, [
    isErrorCredit,
    isSuccessCredit,
    errorCredit,
    isErrorOtp,
    errorOtp,
    dispatch,
  ]);

  useEffect(() => {
    if (isSuccessOtp) {
      rtkMutation(sendCredit, { data: data?.value, id: user?._id });
    }
  }, [isSuccessOtp]);

  //   console.log(otpValue, "val");
  //   console.log(data, "data");

  return (
    <div className="verify_otp">
      <img
        src={close}
        alt="icon"
        className="verify_otp_img"
        onClick={handleModalClose}
      />
      <div className="verify_otp_heading sub_heading">Verify OTP</div>
      <div className="verify_otp_desc_wrap">
        <div className="verify_otp_text">
          Enter the OTP sent to your email to Release Carbon Credit
        </div>
        <div className="verify_otp_amount">{data?.value?.amount} tCO2e</div>
      </div>
      <div className="verify_otp_comp">Name of Company: {data?.name}</div>
      <div className="verify_otp_input_wrap">
        {otp.map((value, index) => (
          <OtpInput
            key={index}
            value={value}
            onChange={handleOtpChange}
            index={index}
            maxLength={1}
            otp={otp}
            setOtp={setOtp}
          />
        ))}
      </div>
      <div className="verify_otp_btn_wrap end">
        <Button
          text={"Cancel"}
          className={"verify_otp_btn_one"}
          onClick={handleModalClose}
        />
        <Button
          text={"Confirm"}
          className={"verify_otp_btn_two"}
          onClick={handleSendCredit}
          loading={loadingOtp || loading}
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
