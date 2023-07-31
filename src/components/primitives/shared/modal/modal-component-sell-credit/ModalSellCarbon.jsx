import React, { useEffect, useRef, useState } from "react";
// import "./ModalBuyCarbon.scss";
import { verify, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import capitalizeInitials from "utils/capitaliseInitials";
import { useInitiateSellMutation } from "services/transaction.service";
import rtkMutation from "utils/rtkMutation";
import formatPrice from "utils/formatPrice";

const ModalSellCarbon = ({ data }) => {
  // make api req
  const [
    initiateSell,
    { data: dataInitiate, isSuccess, error, isError, isLoading },
  ] = useInitiateSellMutation();

  //   set ref, get updated value in a callback
  const isErrorRefSell = useRef(isError);
  const isSuccessRefSell = useRef(isSuccess);
  const errorRefSell = useRef(error);
  const dataRefSell = useRef(data);

  const dispatch = useDispatch();
  const handleDis = () => {
    dispatch(closeComponentModal());
  };

  const [activeTab, setActiveTab] = useState("carbon");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const handleProceed = async () => {
    await rtkMutation(initiateSell, {
      amount: data?.carbon_credit_quantity,
      organization_id: data?.organization_id?._id,
    });

    isSuccessRefSell.current &&
      dispatch(
        openModal({
          title: "Sell Initiated Success",
          message: `You have succesfuly initiated a sell to ${data?.organization_id?.organization_name},
         amouunt is ${data?.carbon_credit_quantity}. Please await payment`,
          success: true,
        })
      );

    isError &&
      dispatch(
        openModal({
          title: "Initiate Sell Failed",
          message:
            error?.data?.message || "An error occured, please try again ",
        })
      );
  };

  //   dispatch(
  //     openModal({
  //       component: "MakePayment",
  //       data: data,
  //       amount: data?.amount,
  //       transaction_id: dataRef?.current?.transaction_id,
  //     })
  //   );

  useEffect(() => {
    isErrorRefSell.current = isError;
    isSuccessRefSell.current = isSuccess;
    errorRefSell.current = error;
    dataRefSell.current = dataInitiate;
  }, [isError, isSuccess, error, dataInitiate]);

  console.log(dataInitiate, "sell");
  // console.log(isErrorRef, isSuccessRef, errorRef, "buysell***");

  return (
    <div className="modal_buy_carb">
      <div className="modal_buy_carb_title sub_heading">
        Sell Carbon Credit{" "}
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_buy_carb_close"
        onClick={handleDis}
      />
      <div className="modal_buy_carb_info_wrap start">
        <div className="modal_buy_carb_info_initials center">
          {" "}
          {capitalizeInitials(data?.organization_id?.organization_name)}
        </div>
        <div className="modal_buy_carb_info_text_wrap">
          <div className="modal_buy_carb_info_text start">
            <span className="modal_buy_carb_info_bold">
              {data?.organization_id?.organization_name || "----"}
            </span>
            {data?.organization_id?.isVerified && (
              <img src={verify} alt="icon" />
            )}
          </div>
          <div className="modal_buy_carb_info_text">
            <span className="modal_buy_carb_info_normal">Trades</span>
            <span className="modal_buy_carb_info_normal modal_buy_carb_info_borderb">
              {data?.organization_id?.date_of_incorporation || "---"}
            </span>
            <span className="modal_buy_carb_info_normal modal_buy_carb_info_borderr">
              Industry: {data?.organization_id?.industry_type || "---"}
            </span>
          </div>
        </div>
      </div>
      <div className="modal_buy_carb_sale_text">
        {/* <span
          className="modal_buy_carb_sale_normal"
          style={{ paddingRight: "20px" }}
        >
          Amount per unit: {activeTab === "fiat" && " $"}
          {data?.amount_per_unit}
          {activeTab === "carbon" && " tCO2e"}
        </span> */}
        <span className="modal_buy_carb_sale_normal">
          {" "}
          Price: {activeTab === "fiat" && " $"}
          {activeTab === "carbon"
            ? data?.amount_per_unit
            : formatPrice(data?.amount_per_unit * data?.carbon_credit_quantity) || "-"}
          {activeTab === "carbon" && " per tCO2e"}
        </span>
      </div>
      <div className="modal_buy_carb_sale_text">
        <span className="modal_buy_carb_sale_normal">Quantity:</span>
        <span
          className="modal_buy_carb_sale_bold"
          style={{ paddingRight: "20px" }}
        >
          {/* {activeTab === "fiat" && "$"} */}
          {data?.carbon_credit_quantity}
          {" tCO2e"}
          {/* {activeTab === "carbon" && " tCO2e"} */}
        </span>
      </div>
      <div className="modal_buy_carb_input_warp">
        <div className="dashboard_table_tab between">
          <div
            className={`dashboard_table_tab_item ${
              activeTab === "carbon" && "dashboard_table_tab_item_active"
            }`}
            onClick={() => handleTabClick("carbon")}
          >
            Carbon Credit
          </div>
          <div
            className={`dashboard_table_tab_item ${
              activeTab === "fiat" && "dashboard_table_tab_item_active"
            }`}
            onClick={() => handleTabClick("fiat")}
          >
            Fiat
          </div>
        </div>
        <div className="modal_buy_carb_input">
          {/* <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal_buy_carb_input_item">
                  <Field
                    name="amount"
                    placeholder={
                      activeTab === "carbon"
                        ? "Enter Amount tCO2e"
                        : "Enter Amount $"
                    }
                    component={Input}
                  />
                </div>
                <div className="modal_buy_carb_input_text_red">
                  Minimum is £12,500
                </div>
                <div className="modal_buy_carb_input_text between">
                  <span>Quantity</span>
                  <span>4,500 tCO2e</span>
                </div>
                <div className="modal_buy_carb_input_text between">
                  <span>Quantity</span>
                  <span>4,500 tCO2e</span>
                </div>
                <Button
                  text={"Proceed"}
                  type={"submit"}
                  className={"modal_buy_carb_input_btn"}
                  // onClick={handleProceed}
                  loading={isLoading}
                />
              </form>
            )}
          /> */}
          <div className="text" style={{ color: "#2B5FAD", fontSize: "12px" }}>
            Proceed to Intiate Sell
          </div>
          <Button
            text={"Proceed"}
            className={"modal_buy_carb_input_btn"}
            onClick={handleProceed}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalSellCarbon;
