import React from "react";
import "./DashboardWallet.scss";
import { eye } from "assets/images";

const DashboardWallet = () => {
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
          <div className="dashboard_wallet_value">0 tCO2e</div>
        </div>
        <div className="between">
          <div style={{ marginRight: "68px" }}>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div className="dashboard_wallet_title">
                  Available Carbon Credit
                </div>
              </div>
            </div>
            <div className="dashboard_wallet_value">0 tCO2e</div>
          </div>
          <div>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div className="dashboard_wallet_title">Ledger Balance</div>
              </div>
            </div>
            <div className="dashboard_wallet_value">0 tCO2e</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWallet;