import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [isModalOPen, setIsModalOpen] = useState(false);

  const [modalContent, setModalContent] = React.useState({
    title: "",
    content: "",
    success: false,
    promptMessage: "",
    promptLink: "",
  });

  const Modal = ({ title, content, success, promptMessage, promptLink }) => {
    setIsModalOpen(true);
    setModalContent({ title, content, success, promptMessage, promptLink });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: "", content: "", success: false, promptMessage: "", promptLink: "" });
  };

  return (
    <ModalContext.Provider
      value={{ isModalOPen, Modal, closeModal, modalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalContextProvider}