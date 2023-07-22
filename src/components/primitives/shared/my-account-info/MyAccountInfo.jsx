import React from "react";
import "./MyAccountInfo.scss";
import { useGetUserQuery } from "services/user.service";
import { avartar, crown, verify } from "assets/images";
import { Badge } from "components";

const MyAccountInfo = () => {
  const { data } = useGetUserQuery();

  return (
    <div className="my_account_info">
      <div className="my_account_info between">
        <img src={avartar} alt="avartar" className="my_account_info_avartar" />
        <div className="my_account_info_detail_wrap_inner">
          <div className="my_account_info_name">
            {data?.organization_id?.organization_name}
          </div>
          <div className="my_account_info_wallet_wrap start">
            <div className="my_account_info_wallet_wrap_inner">
              <div className="my_account_info_wallet_text">Wallet Number</div>
              <div className="my_account_info_wallet_value">
                {data?.organization_id?.wallet_id || "----------------"}
              </div>
            </div>
            <div className="my_account_info_wallet_wrap_inner">
              <div className="my_account_info_wallet_text">Organization</div>
              <div className="my_account_info_wallet_value">
                {data?.organization_id?.organization_name || "----------------"}
              </div>
            </div>
          </div>
        </div>
        <div className="my_account_info_detail_wrap end">
          {/* <div>
            <span> Edit Profile</span>
            <img src="" alt="" />
          </div> */}
          <div className="my_account_info_btn_wrap start wrap">
            <div className="my_account_info_btn">
              <Badge text={"Verified"} image={verify} />
            </div>
            <div className="my_account_info_btn">
              <Badge text={"Admin"} image={crown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountInfo;
