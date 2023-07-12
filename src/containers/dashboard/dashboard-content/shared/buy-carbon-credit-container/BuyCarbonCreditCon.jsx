import React, { useState } from "react";
import "./BuyCarbonCreditCon.scss";
import { BuyCarbonCreditBanner, BuyCarbonCreditCard } from "components";

const BuyCarbonCreditCon = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };
  return (
    <div className="buy_carb_con">
      <BuyCarbonCreditBanner />
      <div className="dash_pad">
        <div className="dashboard_table_tab between">
          <div
            className={`dashboard_table_tab_item ${
              activeTab === "buy" && "dashboard_table_tab_item_active"
            }`}
            onClick={() => handleTabClick("buy")}
          >
            Buy
          </div>
          <div
            className={`dashboard_table_tab_item ${
              activeTab === "sell" && "dashboard_table_tab_item_active"
            }`}
            onClick={() => handleTabClick("sell")}
          >
            Sell
          </div>
        </div>
        <div className="buy_carb_con_crd_wrap">
          <BuyCarbonCreditCard type={activeTab}/>
          <BuyCarbonCreditCard type={activeTab}/>
          <BuyCarbonCreditCard type={activeTab}/>
          <BuyCarbonCreditCard type={activeTab}/>
          <BuyCarbonCreditCard type={activeTab}/>
        </div>
      </div>
    </div>
  );
};

export default BuyCarbonCreditCon;
