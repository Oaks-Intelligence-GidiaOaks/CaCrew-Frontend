import React, { useEffect, useRef, useState } from "react";
import "./ModalBuyOrder.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useSetBuyOrderMutation } from "services/transaction.service";
import { useGetUserQuery } from "services/user.service";
import rtkMutation from "utils/rtkMutation";

const ModalBuyOrder = () => {
  const [setBuyOrder, { error, isError, isSuccess, isLoading }] =
    useSetBuyOrderMutation();

  const { data } = useGetUserQuery();

  const dispatch = useDispatch();

  // create ref values, need to update state inside a callback
  const isSuccessRefBuy = useRef(isSuccess);
  const isErrorRefBuy = useRef(isError);
  const errorRefBuy = useRef(error);

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(setBuyOrder, values);
    isSuccessRefBuy.current &&
      dispatch(
        openModal({
          title: "Order Set Successful",
          message: `You have successfuly placed a buy order for ${values?.available_to_sale} tCO2e`,
          component: null,
          success: true,
        })
      );

    isErrorRefBuy.current &&
      dispatch(
        openModal({
          title: `Buy Order for ${values?.available_to_sale} failed`,
          message: `${errorRefBuy?.current.data?.message} `,
          component: null,
        })
      );
  };

  useEffect(() => {
    isSuccessRefBuy.current = isSuccess;
    isErrorRefBuy.current = isError;
    errorRefBuy.current = error;
  }, [isSuccess, isError, error]);

  console.log(isErrorRefBuy.current, "**", error);

  return (
    <div className="modal_buy_order">
      <div className="modal_buy_order_title sub_heading">Set Buy Order</div>
      <img
        src={close}
        alt="icon"
        className="modal_buy_order_close"
        onClick={handleCloseModal}
      />
      <div className="modal_buy_order_info_wrap ">
        <div className="modal_buy_order_info_bold">
          Total Carbon Credit Available
        </div>
        <div className="modal_buy_order_info_text">
          {data?.wallet_id?.open_balance + " tCO2e" || "-----"}
        </div>
      </div>
      <div className="modal_buy_order_input_warp">
        <div className="modal_buy_order_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal_buy_order_input_item">
                  <Field
                    name="carbon_credit_quantity"
                    placeholder="Enter Amount"
                    label="Carbon credit Quantity (tCO2e)"
                    component={Input}
                  />
                  {/* <div className="modal_buy_order_input_item_fee">
                    Transaction Fee: 0.0 tco2e
                  </div> */}
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
                <div className="modal_buy_order_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"modal_buy_order_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Set"}
                    className={"modal_buy_order_input_btn"}
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

export default ModalBuyOrder;
