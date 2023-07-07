import React from "react";
import "./OrgAdminDashboardHomeCredit.scss";
import { avartar } from "assets/images";
import Button from "components/widgets/button/Button";
import { useGetUserQuery } from "services/user.service";

const OrgAdminDashboardHomeCredit = () => {
  const { data } = useGetUserQuery();
  return (
    <div className="credit between">
      <img src={avartar} alt="avartar" className="credit_avartar" />
      <div className="credit_detail_wrap end">
        <div className="credit_detail_wrap_inner">
          <div className="credit_name">
            {data?.organization_id?.organization_name}
          </div>
          <div className="credit_wallet_wrap start">
            <div className="credit_wallet_wrap_inner">
              <div className="credit_wallet_text">Wallet Number</div>
              <div className="credit_wallet_value">
                {data?.organization_id?.wallet_id || "----------------"}
              </div>
            </div>
            <div className="credit_wallet_wrap_inner">
              <div className="credit_wallet_text">Organization</div>
              <div className="credit_wallet_value">
                {data?.organization_id?.organization_name || "----------------"}
              </div>
            </div>
          </div>
        </div>
        <div className="credit_btn_wrap start wrap">
          <Button
            text={"Buy Carbon Credit"}
            className={`${
              data?.organization_id?.isVerified
                ? "credit_btn"
                : "credit_btn_pending"
            } credit_btn_one`}
          />
          <Button
            text={"Sell Carbon Credit"}
            className={`${
              data?.organization_id?.isVerified
                ? "credit_btn"
                : "credit_btn_pending"
            } credit_btn_two`}
          />
          <Button
            text={"Retire"}
            className={`${
              data?.organization_id?.isVerified
                ? "credit_btn"
                : "credit_btn_pending"
            } credit_btn_three`}
          />
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHomeCredit;
