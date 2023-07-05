import React from "react";
import "./OrgAdminDashboardHomeCredit.scss";
import { avartar } from "assets/images";
import Button from "components/widgets/button/Button";
import { useGetUserQuery } from "services/user.service";

const OrgAdminDashboardHomeCredit = () => {
  const { data } = useGetUserQuery();
  return (
    <div className="org_admin_dashboard_home_credit between">
      <img
        src={avartar}
        alt="avartar"
        className="org_admin_dashboard_home_credit_avartar"
      />
      <div className="org_admin_dashboard_home_credit_detail_wrap end">
        <div className="org_admin_dashboard_home_credit_detail_wrap_inner">
          <div className="org_admin_dashboard_home_credit_name">
            {data?.organization_id?.organization_name}
          </div>
          <div className="org_admin_dashboard_home_credit_wallet_wrap start">
            <div className="org_admin_dashboard_home_credit_wallet_wrap_inner">
              <div className="org_admin_dashboard_home_credit_wallet_text">
                Wallet Number
              </div>
              <div className="org_admin_dashboard_home_credit_wallet_value">
                ----------------
              </div>
            </div>
            <div className="org_admin_dashboard_home_credit_wallet_wrap_inner">
              <div className="org_admin_dashboard_home_credit_wallet_text">
                Organization
              </div>
              <div className="org_admin_dashboard_home_credit_wallet_value">
                Oaks Intelligence Limited
              </div>
            </div>
          </div>
        </div>
        <div className="org_admin_dashboard_home_credit_btn_wrap start wrap">
          <Button
            text={"Buy Carbon Credit"}
            className={
              "org_admin_dashboard_home_credit_btn_one org_admin_dashboard_home_credit_btn_pending"
            }
          />
          <Button
            text={"Sell Carbon Credit"}
            className={
              "org_admin_dashboard_home_credit_btn_two org_admin_dashboard_home_credit_btn_pending"
            }
          />
          <Button
            text={"Retire"}
            className={
              "org_admin_dashboard_home_credit_btn_three org_admin_dashboard_home_credit_btn_pending"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OrgAdminDashboardHomeCredit;
