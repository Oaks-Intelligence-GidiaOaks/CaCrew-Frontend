import React from "react";
import "./BuyCarbonCreditBanner.scss";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";

const BuyCarbonCreditBanner = () => {
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
            text={"Place Buy Order"}
            className={"buy_carbon_banner_btn"}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyCarbonCreditBanner;
