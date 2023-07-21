import React, { useState } from "react";
import "./BuyCarbonCreditCon.scss";
import { BuyCarbonCreditBanner, BuyCarbonCreditCard } from "components";
import {
  useGetSellItemsQuery,
  useGetBuyItemsQuery,
} from "services/transaction.service";

const BuyCarbonCreditCon = () => {
  const [activeTab, setActiveTab] = useState("buy");

  const {
    data: sellData,
    isLoading: sellLoading,
    error: sellError,
    isErorr: sellIsError,
  } = useGetSellItemsQuery();
  const {
    data: buyData,
    isLoading: buyLoading,
    error: buyError,
    isErorr: buyIsError,
  } = useGetBuyItemsQuery();

  const data = activeTab === "sell" ? sellData : buyData;
  // console.log(sellData, "sell", buyData);

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
          {data &&
            data?.map((item) => (
              <div key={item?._id}>
                <BuyCarbonCreditCard type={activeTab} data={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCarbonCreditCon;
