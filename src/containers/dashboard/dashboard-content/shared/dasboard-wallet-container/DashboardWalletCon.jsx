import React from "react";
import "./DashboardWalletCon.scss";
import { Button, DashboardWallet, DashboardWalletBanner, DashboardWalletTable } from "components";
import { Link } from "react-router-dom";

const DashboardWalletCon = () => {
  return (
    <div className="dashboard_wallet_container">
      <DashboardWalletBanner />
      <div className="dashboard_wallet_con_wrap between dash_pad">
        <div className="dashboard_wallet_con">
            <DashboardWallet />
        </div>
        <div className="dashboard_wallet_con_btns center">
          <Link to={"/dashboard-wallet/buy"}>
            <Button text={"Buy Carbon Credit"} className={"dashboard_wallet_con_btn"}/>
          </Link>
            <Button text={"Sell Carbon Credit"} className={"dashboard_wallet_con_btnone"}/>
            <Button text={"Retire"} className={"dashboard_wallet_con_btntwo"}/>
            <Button text={"Generate Statement"} className={"dashboard_wallet_con_btntwo"}/>
        </div>
      </div>
      <div className="dashboard_wallet_con_table dash_pad">
          <DashboardWalletTable />
        </div>
    </div>
  );
};

export default DashboardWalletCon;
