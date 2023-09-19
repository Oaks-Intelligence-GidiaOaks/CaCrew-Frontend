import React from "react";
import "./ModalGenerateStatement.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { required } from "validations/validations";

const ModalGenerateStatement = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    console.log(values);
    dispatch(
      openModal({
        component: "GenerateStatementTable",
        data: values,
      })
    );
  };

  return (
    <div className="modal_generate_statement">
      <div className="modal_generate_statement_title sub_heading">
        Generate Transaction Statement
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_generate_statement_close"
        onClick={handleCloseModal}
      />
      <div className="modal_generate_statement_info_wrap ">
        <div className="modal_generate_statement_info_bold">
          Pls Select Start and End Date
        </div>
      </div>
      <div className="modal_generate_statement_input_warp">
        <div className="modal_generate_statement_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal_generate_statement_input_item">
                  <Field
                    name="start"
                    placeholder="Choose Start Date"
                    label="Start Date"
                    component={Input}
                    date={true}
                    validate={required("Start Date")}
                  />
                </div>
                <div className="modal_generate_statement_input_item">
                  <Field
                    name="end"
                    placeholder="Choose End Date"
                    label="End Date"
                    component={Input}
                    date={true}
                    validate={required("End Date")}
                  />
                </div>
                <div className="modal_generate_statement_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"modal_generate_statement_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Generate"}
                    className={"modal_generate_statement_input_btn"}
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

export default ModalGenerateStatement;
