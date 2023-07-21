import React from "react";
import "./DashboardWallet.scss";
import { eye } from "assets/images";
import { useGetUserQuery } from "services/user.service";

const DashboardWallet = () => {

  const {data} = useGetUserQuery()
  // console.log(data?.wallet_id?.available_to_sale, "kk");

  return (
    <div className="dashboard_wallet">
      <div className="dashboard_wallet_heading">Carbon Credit Wallet</div>
      <div className="dashboard_wallet_wrap">
        <div style={{ marginBottom: "30px" }}>
          <div className="dashboard_wallet_title_wrap">
            <div className="dashboard_wallet_title_icon_wrap start">
              <div className="dashboard_wallet_title">Estimated Balance</div>
              <img src={eye} alt="icon" className="dashboard_wallet_icon" />
            </div>
          </div>
          <div className="dashboard_wallet_value">{data?.wallet_id?.open_balance + data?.wallet_id?.close_balance + " tCO2e" || "- tCO2e" }</div>
        </div>
        <div className="between">
          <div style={{ marginRight: "68px" }}>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div className="dashboard_wallet_title">
                  Open Balance
                </div>
              </div>
            </div>
            <div className="dashboard_wallet_value">{data?.wallet_id?.open_balance + " tCO2e" || " - tCO2e"}</div>
          </div>
          <div>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div className="dashboard_wallet_title">Closed Balance</div>
              </div>
            </div>
            <div className="dashboard_wallet_value">{data?.wallet_id?.close_balance} tCO2e</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWallet;
