import React from "react";
import "./DashboardWalletCon.scss";
import {
  Button,
  DashboardWallet,
  DashboardWalletBanner,
  DashboardWalletTable,
} from "components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useGetMyTransactionQuery } from "services/transaction.service";
import {
  useGetSellItemsQuery,
  useGetBuyItemsQuery,
} from "services/transaction.service";

const DashboardWalletCon = () => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ component: "ModalSellOrder" }));
  };

  const handleOpenModalRetire = () => {
    dispatch(openModal({ component: "ModalRetireCredit" }));
  };

  const { data: dataMyTranscation } = useGetMyTransactionQuery();

  return (
    <div className="dashboard_wallet_container">
      <DashboardWalletBanner />
      <div className="dashboard_wallet_con_wrap between dash_pad">
        <div className="dashboard_wallet_con">
          <DashboardWallet />
        </div>
        <div className="dashboard_wallet_con_btns center">
          <Link to={"/dashboard-wallet/buy"}>
            <Button
              text={"Buy Carbon Credit"}
              className={"dashboard_wallet_con_btn"}
            />
          </Link>
          <Button
            text={"Sell Carbon Credit"}
            className={"dashboard_wallet_con_btnone"}
            onClick={handleOpenModal}
          />
          <Button
            text={"Retire"}
            className={"dashboard_wallet_con_btntwo"}
            onClick={handleOpenModalRetire}
          />
          <Button
            text={"Generate Statement"}
            className={"dashboard_wallet_con_btntwo"}
          />
        </div>
      </div>
      <div className="dashboard_wallet_con_table dash_pad">
        <DashboardWalletTable data={dataMyTranscation} />
      </div>
    </div>
  );
};

export default DashboardWalletCon;
