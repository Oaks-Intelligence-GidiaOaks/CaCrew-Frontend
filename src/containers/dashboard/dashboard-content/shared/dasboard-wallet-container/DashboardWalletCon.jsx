import React from "react";
import "./DashboardWalletCon.scss";
import {
  Button,
  DashboardWallet,
  DashboardWalletBanner,
  DashboardWalletTable,
} from "components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import {
  useGetSellItemsQuery,
  useGetBuyItemsQuery,
} from "services/transaction.service";

const DashboardWalletCon = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user)

  const handleOpenModal = () => {
    dispatch(openModal({ component: "ModalSellOrder" }));
  };

  const handleOpenModalRetire = () => {
    dispatch(openModal({ component: "ModalRetireCredit" }));
  };

  const handleOpenModalStatement = () => {
    dispatch(openModal({ component: "ModalGenerateStatement" }));
  };

  const handleOpenModalAllTransactionStatement = () => {
    dispatch(openModal({ component: "ModalGenerateAllTransactionStatement" }));
  };

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
            text={"Generate My Statement"}
            className={"dashboard_wallet_con_btntwo"}
            onClick={handleOpenModalStatement}
          />
          {user.role === "SuperAdmin" && <Button
            text={"Generate All Statement"}
            className={"dashboard_wallet_con_btntwo"}
            onClick={handleOpenModalAllTransactionStatement}
          />}
        </div>
      </div>
      <div className="dashboard_wallet_con_table dash_pad">
        <DashboardWalletTable />
      </div>
    </div>
  );
};

export default DashboardWalletCon;
