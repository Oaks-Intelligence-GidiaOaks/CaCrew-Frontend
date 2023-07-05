import React from "react";
import "./OrgAdminDashboardHomeCredit.scss";
import { avartar } from "assets/images";
import Button from "components/widgets/button/Button";
import { useGetUserQuery } from "services/user.service";

const OrgAdminDashboardHomeCredit = () => {
  const { data } = useGetUserQuery();
  return (
    <div className="credit between">
      <img
        src={avartar}
        alt="avartar"
        className="credit_avartar"
      />
      <div className="credit_detail_wrap end">
        <div className="credit_detail_wrap_inner">
          <div className="credit_name">
            {data?.organization_id?.organization_name}
          </div>
          <div className="credit_wallet_wrap start">
            <div className="credit_wallet_wrap_inner">
              <div className="credit_wallet_text">
                Wallet Number
              </div>
              <div className="credit_wallet_value">
                ----------------
              </div>
            </div>
            <div className="credit_wallet_wrap_inner">
              <div className="credit_wallet_text">
                Organization
              </div>
              <div className="credit_wallet_value">
                Oaks Intelligence Limited
              </div>
            </div>
          </div>
        </div>
        <div className="credit_btn_wrap start wrap">
          <Button
            text={"Buy Carbon Credit"}
            className={
              "credit_btn_one credit_btn_pending"
            }
          />
          <Button
            text={"Sell Carbon Credit"}
            className={
              "credit_btn_two credit_btn_pending"
            }
          />
          <Button
            text={"Retire"}
            className={
              "credit_btn_three credit_btn_pending"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHomeCredit;
