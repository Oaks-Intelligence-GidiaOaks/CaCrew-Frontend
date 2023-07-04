import React from "react";
import "./DashboardHomeCredit.scss";
import { avartar } from "assets/images";
import Button from "components/widgets/Button/Button";
import { useGetUserQuery } from "services/user.service";

const DashboardHomeCredit = () => {
  const { data} = useGetUserQuery();
  return (
    <div className="dashboard_home_credit between">
      <img
        src={avartar}
        alt="avartar"
        className="dashboard_home_credit_avartar"
      />
      <div className="dashboard_home_credit_detail_wrap end">
        <div className="dashboard_home_credit_detail_wrap_inner">
          <div className="dashboard_home_credit_name">{data?.organization_id?.organization_name}</div>
          <div className="dashboard_home_credit_wallet_wrap start">
            <div className="dashboard_home_credit_wallet_wrap_inner">
              <div className="dashboard_home_credit_wallet_text">
                Wallet Number
              </div>
              <div className="dashboard_home_credit_wallet_value">
                ----------------
              </div>
            </div>
            <div className="dashboard_home_credit_wallet_wrap_inner">
              <div className="dashboard_home_credit_wallet_text">
                Organization
              </div>
              <div className="dashboard_home_credit_wallet_value">
                Oaks Intelligence Limited
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard_home_credit_btn_wrap start wrap">
          <Button
            text={"Buy Carbon Credit"}
            className={
              "dashboard_home_credit_btn_one dashboard_home_credit_btn_pending"
            }
          />
          <Button
            text={"Sell Carbon Credit"}
            className={
              "dashboard_home_credit_btn_two dashboard_home_credit_btn_pending"
            }
          />
          <Button
            text={"Retire"}
            className={
              "dashboard_home_credit_btn_three dashboard_home_credit_btn_pending"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeCredit;
