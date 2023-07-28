import React from "react";
import "./MyAccount.scss";
import { MyAccountBanner, MyAccountInfo } from "components";

const MyAccount = () => {
  return (
    <div className="my_account">
      <div>
        <MyAccountBanner />
      </div>
      <div className="dash_pad">
        <MyAccountInfo />
      </div>
    </div>
  );
};

export default MyAccount;
