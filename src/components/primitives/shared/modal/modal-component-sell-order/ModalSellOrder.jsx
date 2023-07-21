import React, { useEffect, useRef, useState } from "react";
import "./ModalSellOrder.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useSetSaleOrganisationMutation } from "services/organisation.service";
import { useGetUserQuery } from "services/user.service";
import rtkMutation from "utils/rtkMutation";

const ModalSellOrder = () => {
  const [setSaleOrganisation, { error, isError, isSuccess, isLoading }] =
    useSetSaleOrganisationMutation();

  const { data } = useGetUserQuery();

  const dispatch = useDispatch();

  // create ref values, need to update state inside a callback
  const isSuccessRef = useRef(isSuccess);
  const isErrorRef = useRef(isError);
  const errorRef = useRef(error);

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    // console.log(values);
    await rtkMutation(setSaleOrganisation, values);
    isSuccessRef.current &&
      dispatch(
        openModal({
          title: "Order Set Successful",
          message: `You have successfuly placed a sell order for ${values?.available_to_sale} tCO2e`,
          success: true,
        })
      );

    isErrorRef.current &&
      dispatch(
        openModal({
          title: `Order for ${values?.available_to_sale} failed`,
          message: `${errorRef?.current?.data?.message || "An error occured, please try again"} `,
          component: null,
        })
      );
  };

  useEffect(() => {
    isSuccessRef.current = isSuccess;
    isErrorRef.current = isError;
    errorRef.current = error;
  }, [isSuccess, isError, error]);

    console.log(isErrorRef.current, "**", error);


  return (
    <div className="modal_sell_carb">
      <div className="modal_sell_carb_title sub_heading">
        Set Sell Order
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
        <div className="modal_sell_carb_info_text">
          {data?.wallet_id?.open_balance + " tCO2e" || "-----"}
        </div>
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
                  {/* <div className="modal_sell_carb_input_item_fee">
                    Transaction Fee: 0.0 tco2e
                  </div> */}
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
                    loading={isLoading}
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

export default ModalSellOrder;
