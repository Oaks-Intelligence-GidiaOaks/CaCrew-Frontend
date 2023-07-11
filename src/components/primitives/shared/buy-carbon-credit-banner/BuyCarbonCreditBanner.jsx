import React from "react";
import "./BuyCarbonCreditBanner.scss";
import { Form, Field } from "react-final-form";
import { Input } from "components";

const BuyCarbonCreditBanner = () => {
  const onSubmit = (value) => {
    console.log(value);
  };
  return (
    <div className="buy_carbon_banner">
      <div className="buy_carbon_banner_title_wrap">
        <div className="buy_carbon_banner_title"></div>
        <div className="buy_carbon_banner_subtitle"></div>
      </div>
      <div className="buy_carbon_banner_search">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <div className="buy_carbon_banner_search_item">
              <Field name="location" component={Input} select selectDefault="Filter By Location" />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default BuyCarbonCreditBanner;
