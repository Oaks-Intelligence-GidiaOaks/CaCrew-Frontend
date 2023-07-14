import React, { useState } from "react";
import "./ModalSellCarbon.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useSetSaleOrganisationMutation } from "services/organisation.service";
import rtkMutation from "utils/rtkMutation";

const ModalSellCarbon = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const [setSaleOrganisation, { error, isSuccess }] =
    useSetSaleOrganisationMutation();

  const onSubmit = (values) => {
    console.log(values);
    rtkMutation(setSaleOrganisation, values);
  };
  console.log(error, "error")
  return (
    <div className="modal_sell_carb">
      <div className="modal_sell_carb_title sub_heading">
        Sell Carbon Credit
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_sell_carb_close"
        onClick={handleCloseModal}
      />
      <div className="modal_sell_carb_info_wrap ">
        <div className="modal_sell_carb_info_bold">
          Total Carbon Credit Available
        </div>
        <div className="modal_sell_carb_info_text">700,000 tCO2e</div>
      </div>
      <div className="modal_sell_carb_input_warp">
        <div className="modal_sell_carb_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal_sell_carb_input_item">
                  <Field
                    name="available_to_sale"
                    placeholder="Enter Amount"
                    label="Total Sell Quantity (tCO2e)"
                    component={Input}
                  />
                  <div className="modal_sell_carb_input_item_fee">
                    Transaction Fee: 0.0 tco2e
                  </div>
                </div>
                <div className="modal_sell_carb_input_item">
                  <Field
                    name="minimum_sale_unit"
                    placeholder="Enter Amount"
                    label="Minimum Sale Quantity (tCO2e)"
                    tooltip={"Input sell quantiy"}
                    component={Input}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="amount_per_unit"
                    placeholder="Enter Amount"
                    label="Enter Price Per tCO2e (tCO2e)"
                    tooltip={"Total sell quantity"}
                    component={Input}
                  />
                </div>
                <div className="modal_sell_carb_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"modal_sell_carb_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Sell"}
                    className={"modal_sell_carb_input_btn"}
                    type={"submit"}
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

export default ModalSellCarbon;
