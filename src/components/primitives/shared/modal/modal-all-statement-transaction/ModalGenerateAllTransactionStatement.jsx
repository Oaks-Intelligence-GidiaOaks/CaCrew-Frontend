import React from "react";
import { useSelector } from "react-redux";
import "./ModalGenerateAllTransactionStatement.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { required } from "validations/validations";

const ModalGenerateAllTransactionStatement = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = (values) => {
    dispatch(
      openModal({
        component: "GenerateAllTransactionStatementTable",
        data: values,
      })
    );
  };

  return (
    <div className="ModalGenerateAllTransactionStatement">
      <div className="ModalGenerateAllTransactionStatement_title sub_heading">
        Generate All Accounts Transactions Statement
      </div>
      <img
        src={close}
        alt="icon"
        className="ModalGenerateAllTransactionStatement_close"
        onClick={handleCloseModal}
      />
      <div className="ModalGenerateAllTransactionStatement_info_wrap ">
        <div className="ModalGenerateAllTransactionStatement_info_bold">
          Pls Select Start and End Date
        </div>
      </div>
      <div className="ModalGenerateAllTransactionStatement_input_warp">
        <div className="ModalGenerateAllTransactionStatement_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="ModalGenerateAllTransactionStatement_input_item">
                  <Field
                    name="start"
                    placeholder="Choose Start Date"
                    label="Start Date"
                    component={Input}
                    date={true}
                    validate={required("Start Date")}
                  />
                </div>
                <div className="ModalGenerateAllTransactionStatement_input_item">
                  <Field
                    name="end"
                    placeholder="Choose End Date"
                    label="End Date"
                    component={Input}
                    date={true}
                    validate={required("End Date")}
                  />
                </div>
                <div className="ModalGenerateAllTransactionStatement_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={
                      "ModalGenerateAllTransactionStatement_input_btn_two"
                    }
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Generate"}
                    className={"ModalGenerateAllTransactionStatement_input_btn"}
                    type={"submit"}
                    disabled={!valid}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalGenerateAllTransactionStatement;
