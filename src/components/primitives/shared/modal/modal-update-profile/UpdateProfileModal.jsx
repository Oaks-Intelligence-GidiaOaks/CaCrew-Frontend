import React from "react";
import "../modal-component-sell-order/ModalSellOrder.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import {required} from "validations/validations";

const UpdateProfileModal = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    // console.log(values);
    dispatch(
      openModal({
        component: "ConfirmRetireCredit",
        data: values,
      })
    );
  };

  //   console.log(isErrorRef.current, "**", error);
  return (
    <div className="modal_sell_carb">
      <div className="modal_sell_carb_title sub_heading">
        Retire Carbon credit
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_sell_carb_close"
        onClick={handleCloseModal}
      />
      <div className="modal_sell_carb_info_wrap ">
        <div className="modal_sell_carb_info_bold">
          Retire carbon credits to offset your carbon emissions
        </div>
        {/* <div className="modal_sell_carb_info_text">
          {data?.wallet_id?.open_balance + " tCO2e" || "-----"}
        </div> */}
      </div>
      <div className="modal_sell_carb_input_warp">
        <div className="modal_sell_carb_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal_sell_carb_input_item">
                  <Field
                    name="wallet_type"
                    label="Select Wallet to Retire From"
                    component={Input}
                    select
                    options={{ Close: "Close", Open: "Open" }}
                    validate={required("Wallet type")}

                  />
                  {/* <div className="modal_sell_carb_input_item_fee">
                    Transaction Fee: 0.0 tco2e
                  </div> */}
                </div>
                <div className="modal_sell_carb_input_item">
                  <Field
                    name="amount"
                    placeholder="Enter Amount"
                    label="Retire Amount"
                    tooltip={"Input quantiy to retire"}
                    component={Input}
                    validate={required("Retire amount")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="purpose"
                    placeholder="Enter purpose"
                    label="Purpose of Retirement"
                    tooltip={"Enter organization to retire carbon credit"}
                    component={Input}
                    validate={required("Purpose")}

                  />
                </div>
                <div className="modal_sell_carb_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"modal_sell_carb_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Retire"}
                    className={"modal_sell_carb_input_btn"}
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

export default UpdateProfileModal;
