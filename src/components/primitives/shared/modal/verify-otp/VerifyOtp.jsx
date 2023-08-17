import React from "react";
import "./VerifyOtp";
import { close } from "assets/images";

const VerifyOtp = ({title, desc, amount, company}) => {
  return (
    <div className="verify_otp">
      <img src={close} alt="icon" />
      <div className="verify_otp_heading sub_heading">Verify OTP</div>
      <div className="verify_otp_desc_wrap">
        <div>Enter the OTP sent to your email to Release Carbon Credit</div>
        <div>730 tCO2e</div>
      </div>
      <div className="verify_otp_comp">
        Name of Company: The Fisher Organization
      </div>
    </div>
  );
};

export default VerifyOtp;
