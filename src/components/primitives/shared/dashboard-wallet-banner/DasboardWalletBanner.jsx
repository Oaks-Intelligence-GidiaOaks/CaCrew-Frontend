import React from "react";
import "./DasboardWalletBanner.scss";
import { useGetUserQuery } from "services/user.service";

const DasboardWalletBanner = () => {

  const {data} = useGetUserQuery() 
  return (
    <div className="dashboard_wallet_banner between">
      <div className="dashboard_wallet_banner_title sub_heading">Wallet Overview</div>
      <div className="dashboard_wallet_banner_info_wrap start">
        <div className="dashboard_wallet_banner_info">
          <div className="dashboard_wallet_banner_info_title">
            Wallet Number
          </div>
          <div className="dashboard_wallet_banner_info_value">{data?.wallet_id?._id || "-------"}</div>
        </div>
        <div className="dashboard_wallet_banner_info">
          <div className="dashboard_wallet_banner_info_title">Organization</div>
          <div className="dashboard_wallet_banner_info_value">
            {data?.organization_id?.organization_name || "-------"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DasboardWalletBanner;
