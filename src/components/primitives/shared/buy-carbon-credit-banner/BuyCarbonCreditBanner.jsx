import React from "react";
import "./BuyCarbonCreditBanner.scss";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { openModal } from "redux/slices/modal.slice";
import { useDispatch } from "react-redux";

const BuyCarbonCreditBanner = () => {
  const dispatch = useDispatch();

  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <div className="buy_carbon_banner between">
      <div className="buy_carbon_banner_title_wrap">
        <div className="buy_carbon_banner_title sub_heading">
          Buy Carbon Credit
        </div>
        <div className="buy_carbon_banner_subtitle">
          Buy from verified organizations or place a buy order
        </div>
      </div>
      <div className="buy_carbon_banner_search start">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="buy_carbon_banner_search_item"
            >
              <Field
                name="location"
                component={Input}
                select
                selectDefault="Filter By Location"
                className= "buy_carbon_banner_search_input"
              />
            </form>
          )}
        />
        <div className="buy_carbon_banner_search_item">
          <Button
            text={"Set Buy Order"}
            className={"buy_carbon_banner_btn"}
            onClick={() => {
              dispatch(openModal({
                component: "ModalBuyOrder",

              }))
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyCarbonCreditBanner;
