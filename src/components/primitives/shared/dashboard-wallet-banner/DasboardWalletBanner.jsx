import React from "react";
import "./DasboardWalletBanner.scss";

const DasboardWalletBanner = () => {
  return (
    <div className="dashboard_wallet_banner between">
      <div className="dashboard_wallet_banner_title sub_heading">Wallet Overview</div>
      <div className="dashboard_wallet_banner_info_wrap start">
        <div className="dashboard_wallet_banner_info">
          <div className="dashboard_wallet_banner_info_title">
            Wallet Number
          </div>
          <div className="dashboard_wallet_banner_info_value">34572753638</div>
        </div>
        <div className="dashboard_wallet_banner_info">
          <div className="dashboard_wallet_banner_info_title">Organization</div>
          <div className="dashboard_wallet_banner_info_value">
            Oaks Intelligence Limited
          </div>
        </div>
      </div>
    </div>
  );
};

export default DasboardWalletBanner;
