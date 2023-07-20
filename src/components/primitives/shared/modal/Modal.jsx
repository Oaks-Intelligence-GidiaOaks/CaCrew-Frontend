import React from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { failed, success } from "assets/images";
import Button from "components/widgets/button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/slices/modal.slice";
import {
  ModalSellOrder,
  ModalBuyCarbon,
  MakePayment,
  ModalBuyOrder,
  ConfirmPayment
} from "components";

const Modal = () => {
  const {
    title,
    message,
    isOpen,
    isOpenComponent,
    promptMessage,
    promptLink,
    component,
    success: succeeded,
    data,
    amount,
    transaction_id,
  } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  // console.log(isOpen, "open", isOpenComponent, "comp-", component, "title-", amount, "transId", transaction_id);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(promptLink);
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  const ComponentItem = {
    ModalSellOrder: <ModalSellOrder />,
    ModalBuyCarbon: <ModalBuyCarbon data={data} />,
    MakePayment: <MakePayment data={data} amount={amount} transactionId= {transaction_id} />,
    ConfirmPayment: <ConfirmPayment data={data} />,
    ModalBuyOrder: <ModalBuyOrder />,
  }[component];

  return (
    <>
      <div
        className={`${
          isOpenComponent ? "modal center col" : "modal_close center col"
        }`}
      >
        {component && ComponentItem}
      </div>
      <div
        className={`${isOpen ? "modal center col" : "modal_close center col"}`}
      >
        <div className="modal_content_wrap center col">
          <div className="modal_content_title">{title}</div>
          <div className="modal_message_text">{message}</div>
          {succeeded ? (
            <img className="modal_content_image" src={success} alt="icon" />
          ) : (
            <img className="modal_content_image" src={failed} alt="icon" />
          )}
          {
            <Button
              text={promptMessage ? promptMessage : "Close"}
              onClick={() => {
                promptLink?.length > 1 ? handleNavigate() : handleClose();
              }}
            />
          }
        </div>
      </div>
    </>
  );
};

export default Modal;
