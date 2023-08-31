import React, { useState } from "react";
import "./DashboardWallet.scss";
import { eye, eyeclose, pattern, patterntwo } from "assets/images";
import { useGetUserQuery } from "services/user.service";
import { useSelector } from "react-redux";
import { Shimmer } from "components";

const DashboardWallet = () => {
  const { data } = useGetUserQuery();
  const user = useSelector((state) => state.user.user);

  const [isVisible, setIsVisible] = useState(false);

  // console.log(user, "kk");
  // console.log(
  //   user?.wallet_id?.open_balance, user?.wallet_id?.close_balance,
  //   "add"
  // );

  return (
    <div className="dashboard_wallet">
      <div className="dashboard_wallet_heading">Carbon Credit Wallet</div>
      <div
        className="dashboard_wallet_wrap"
        style={{
          background:
            user?.role !== "SuperAdmin"
              ? "#115CCD"
              : "linear-gradient(226deg, #ECDAF9 0%, #BDD2FA 38.11%, #E9EDF9 90.25%)",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <div className="dashboard_wallet_title_wrap">
            <img
              src={user?.role !== "SuperAdmin" ? pattern : patterntwo}
              alt="pattern"
              className={`${
                user?.role !== "SuperAdmin"
                  ? "dashboard_wallet_pattern"
                  : "dashboard_wallet_patterntwo"
              }`}
            />
            <div className="dashboard_wallet_title_icon_wrap start">
              <div
                className="dashboard_wallet_title"
                style={{ color: user?.role !== "SuperAdmin" && "#DEDEDE" }}
              >
                Estimated Balance
              </div>
              <img
                src={isVisible ? eye : eyeclose}
                alt="icon"
                className="dashboard_wallet_icon"
                onClick={() => setIsVisible(!isVisible)}
              />
            </div>
          </div>
          {data ? (
            <div
              className="dashboard_wallet_value"
              style={{ color: user?.role !== "SuperAdmin" && "#F1F1F1" }}
            >
              {isVisible
                ? `${
                    data?.wallet_id?.open_balance +
                    data?.wallet_id?.close_balance
                  } tCO2e`
                : "******"}
            </div>
          ) : (
            <Shimmer height={"20px"} width={"80px"} />
          )}
        </div>
        <div className="between">
          <div style={{ marginRight: "68px" }}>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div
                  className="dashboard_wallet_title"
                  style={{
                    color: user?.role !== "SuperAdmin" && "#DEDEDE",
                  }}
                >
                  Open Balance
                </div>
              </div>
            </div>
            {data ? (
              <div
                className="dashboard_wallet_value"
                style={{ color: user?.role !== "SuperAdmin" && "#F1F1F1" }}
              >
                {isVisible
                  ? data?.wallet_id?.open_balance + " tCO2e"
                  : "******"}
              </div>
            ) : (
              <Shimmer height={"20px"} width={"80px"} />
            )}
          </div>
          <div>
            <div className="dashboard_wallet_title_wrap">
              <div className="dashboard_wallet_title_icon_wrap start">
                <div
                  className="dashboard_wallet_title"
                  style={{
                    color: user?.role !== "SuperAdmin" && "#DEDEDE",
                  }}
                >
                  Closed Balance
                </div>
              </div>
            </div>
            {data ? (
              <div
                className="dashboard_wallet_value"
                style={{ color: user?.role !== "SuperAdmin" && "#F1F1F1" }}
              >
                {isVisible
                  ? data?.wallet_id?.close_balance + " tCO2e"
                  : "******"}
              </div>
            ) : (
              <Shimmer height={"20px"} width={"80px"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWallet;
