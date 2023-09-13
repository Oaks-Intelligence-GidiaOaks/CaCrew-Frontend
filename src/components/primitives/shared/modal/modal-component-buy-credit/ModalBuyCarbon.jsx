import React, { useEffect, useRef, useState } from "react";
import "./ModalBuyCarbon.scss";
import { verify, close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field, FormSpy } from "react-final-form";
import { Button, Input } from "components";
import capitalizeInitials from "utils/capitaliseInitials";
import { useInitiateBuyMutation } from "services/transaction.service";
import rtkMutation from "utils/rtkMutation";
import formatPrice from "utils/formatPrice";
// import { OnChange } from "react-final-form-listeners";

const ModalBuyCarbon = ({ data }) => {
  // make api req
  const [
    initiateBuy,
    { data: dataInitiate, isSuccess, error, isError, isLoading },
  ] = useInitiateBuyMutation();

  // carbon credit amount
  const [amount, setAmount] = useState();
  const [activeTab, setActiveTab] = useState("carbon");

  // set ref, get updated value in a callback
  const isErrorRef = useRef(isError);
  const isSuccessRef = useRef(isSuccess);
  const errorRef = useRef(error);
  const dataRef = useRef(data);
  // const amountRef = useRef(amount);

  const dispatch = useDispatch();
  const handleDis = () => {
    dispatch(closeComponentModal());
  };

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const onSubmit = async (values) => {
    values["organization_id"] = data?.organization_id?._id;
    if (activeTab === "fiat") {
      values["amount"] = Math.ceil(amount / data?.amount_per_unit);
    }
    await rtkMutation(initiateBuy, values);

    isSuccessRef.current &&
      dispatch(
        openModal({
          component: "MakePayment",
          data: data,
          amount: values.amount,
          transaction_id: dataRef?.current?.transaction_id,
        })
      );
    isErrorRef.current &&
      dispatch(
        openModal({
          title: "Initiate Buy",
          message:
            errorRef?.current?.data?.message ||
            "An error occured, please try again ",
        })
      );
    // console.log(values, "vals");
  };

  useEffect(() => {
    isErrorRef.current = isError;
    isSuccessRef.current = isSuccess;
    errorRef.current = error;
    dataRef.current = dataInitiate;
  }, [isError, isSuccess, error, dataInitiate, amount]);

  // console.log(amount, "buysell");
  // console.log(isErrorRef, isSuccessRef, errorRef, "buysell***");

  return (
    <div className="modal_buy_carb">
      <div className="modal_buy_carb_title sub_heading">Buy Carbon Credit </div>
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
        <span
          className="modal_buy_carb_sale_normal"
          style={{ paddingRight: "20px" }}
        >
          Minimum Sale Available:
          {/* {activeTab === "fiat" && " $"} */} {data?.minimum_sale_unit}
          {" tCO2e"}
        </span>
        <span className="modal_buy_carb_sale_normal">
          {" "}
          Price: {data?.amount_per_unit + " per tCO2e"}
        </span>
      </div>
      <div className="modal_buy_carb_sale_text">
        <span className="modal_buy_carb_sale_normal">Total Available:</span>
        <span
          className="modal_buy_carb_sale_bold"
          style={{ paddingRight: "20px" }}
        >
          {/* {activeTab === "fiat" && "$"} */}
          {data?.available_to_sale} {" tCO2e"}
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
          <Form
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
                  {"Transaction fee: " + Math.ceil((amount * 0.015).toFixed(2))}
                </div>
                <div className="modal_buy_carb_input_text between">
                  <span>Quantity</span>
                  <span>
                    {activeTab === "carbon"
                      ? amount - Math.ceil(amount * 0.015)
                      : Math.ceil(amount / data?.amount_per_unit)}
                  </span>
                </div>
                {/* <div className="modal_buy_carb_input_text between">
                  <span>Quantity</span>
                  <span>4,500 tCO2e</span>
                </div> */}
                <Button
                  text={"Proceed"}
                  type={"submit"}
                  className={"modal_buy_carb_input_btn"}
                  // onClick={handleProceed}
                  loading={isLoading}
                />
                <FormSpy
                  subscription={{ values: true }}
                  onChange={(props) => {
                    const amount = props.values.amount;
                    setAmount(amount);
                  }}
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalBuyCarbon;
