import React from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { failed, success } from "assets/images";
import Button from "components/widgets/button/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/slices/modal.slice";

const Modal = () => {
  const {
    title,
    message,
    isOpen,
    promptMessage,
    promptLink,
    component: Component,
    success: succeeded,
  } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  console.log(isOpen, "open")

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(promptLink);
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className={`${isOpen ? "modal center col" : "modal_close"}`}>
      {Component ? (
        <Component />
      ) : (
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
              onClick={() => {promptLink?.length > 1 ? handleNavigate() : handleClose()}}
            />
          }
        </div>
      )}
    </div>
  );
};

export default Modal;
