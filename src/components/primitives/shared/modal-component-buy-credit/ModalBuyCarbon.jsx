import React, { useState } from "react";
import "./ModalBuyCarbon.scss";
import { verify, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";

const ModalBuyCarbon = () => {
  const dispatch = useDispatch();
  const handleDis = () => {
    dispatch(closeModal());
  };
  const handleProceed = () => {
    dispatch(closeModal());
    dispatch(openModal({component: "MakePayment"}))
  };

  const [activeTab, setActiveTab] = useState("carbon");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const onSubmit = (value) => {
    console.log(value);
  };

  return (
    <div className="modal_buy_carb">
      <div className="modal_buy_carb_title sub_heading">Add Carbon Credit to Cart</div>
      <img src={close} alt="icon" className="modal_buy_carb_close" onClick={handleDis}/>
      <div className="modal_buy_carb_info_wrap start">
        <div className="modal_buy_carb_info_initials center">AK</div>
        <div className="modal_buy_carb_info_text_wrap">
          <div className="modal_buy_carb_info_text start">
            <span className="modal_buy_carb_info_bold">
              Agroventure Kapital
            </span>
            <img src={verify} alt="icon" />
          </div>
          <div className="modal_buy_carb_info_text">
            <span className="modal_buy_carb_info_normal">421 Trades</span>
            <span className="modal_buy_carb_info_normal modal_buy_carb_info_borderb">
              Registered: 02/05/2022
            </span>
            <span className="modal_buy_carb_info_normal modal_buy_carb_info_borderr">
              Industry: Agriculture
            </span>
          </div>
        </div>
      </div>
      <div className="modal_buy_carb_sale_text">
        <span
          className="modal_buy_carb_sale_normal"
          style={{ paddingRight: "20px" }}
        >
          Minimum Sale Available: 20,500 tCO2e
        </span>
        <span className="modal_buy_carb_sale_normal">Price: £50 per tCO2e</span>
      </div>
      <div className="modal_buy_carb_sale_text">
        <span className="modal_buy_carb_sale_normal">Total Available:</span>
        <span
          className="modal_buy_carb_sale_bold"
          style={{ paddingRight: "20px" }}
        >
          20,500 tCO2e
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
            By Carbon Credit
          </div>
          <div
            className={`dashboard_table_tab_item ${
              activeTab === "fiat" && "dashboard_table_tab_item_active"
            }`}
            onClick={() => handleTabClick("fiat")}
          >
            By Fiat
          </div>
        </div>
        <div className="modal_buy_carb_input">
          <Form onSubmit={onSubmit} render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <div className="modal_buy_carb_input_item">
                    <Field name="amount" placeholder="Enter Amount" component={Input}/>
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
                <Button text={"Proceed"} className={"modal_buy_carb_input_btn"} onClick={handleProceed}/>
            </form>
          )}/>
        </div>
      </div>
    </div>
  );
};

export default ModalBuyCarbon;
