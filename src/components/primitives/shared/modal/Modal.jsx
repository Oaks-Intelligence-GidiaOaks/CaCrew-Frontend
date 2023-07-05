import React, { useContext } from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "context/modalContext";
import { eye, info_circle } from "assets/images";
import Button from "components/widgets/button/Button";

const Modal = () => {
  const { isModalOPen, modalContent, closeModal, promptMessage, promptLink } =
    useContext(ModalContext);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(promptLink);
    closeModal();
  };

  return (
    <div className={`${isModalOPen ? "modal center col" : "modal_close"}`}>
      <div className="modal_content_wrap center col">
        <div className="modal_content_title">{"modalContent.title"}</div>
        <div className="modal_content_text">{"modalContent.title"}</div>
        {modalContent.success ? (
          <img className="modal_content_image" src={eye} alt="icon" />
        ) : (
          <img className="modal_content_image" src={info_circle} alt="icon" />
        )}
        {
          <Button
            text={promptMessage ? promptMessage : "Close"}
            onClick={promptLink ? handleNavigate : closeModal}
          />
        }
      </div>
    </div>
  );
};

export default Modal;
