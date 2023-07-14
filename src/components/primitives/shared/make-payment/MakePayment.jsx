import React, { useState } from "react";
import "./MakePayment.scss";
import { close, messge, verify } from "assets/images";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/slices/modal.slice";
import { Button } from "components";

const MakePayment = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const onSubmit = (value) => {
    console.log(value);
  };

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
            <div className="make_payment_info_initials center">AK</div>
            <span className="make_payment_info_bold">Agroventure Kapital</span>
            <img src={verify} alt="icon" />
          </div>
          <div className="make_payment_info_initials_contact">
            <span>Contact Seller:</span>
            <span>+1 340 678 8983</span>
          </div>
        </div>
        <div className="make_payment_info_method between">
          <div className="make_payment_info_method_item">
            <div className="make_payment_info_method_text">
              Quantity of Carbon Credit
            </div>
            <div className="make_payment_info_method_value">100 tCO2e</div>
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
                $5,000{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="make_payment_btn_wrap end">
          <Button
            text={"Cancel"}
            className={"make_payment_btn_two"}
            onClick={handleCloseModal}
          />
          <Button text={"I Have Made Payment"} className={"make_payment_btn"} />
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
