import React from "react";
import "./MyAccountInfo.scss";
import { useGetUserQuery } from "services/user.service";
import { avartar, crown, verify, sms, calendar, call } from "assets/images";
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
      <div className="my_account_info_item_container">
        <div className="my_account_info_item_wrap">
          <div className="my_account_info_item start">
            <img src={sms} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Email Address</div>
              <div className="my_account_info_item_text">
                georgebaskerville@oaksintelligence.com
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img src={call} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Phone Number</div>
              <div className="my_account_info_item_text">+1 260 799 9872</div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendar}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Member since</div>
              <div className="my_account_info_item_text">4th January 2021</div>
            </div>
          </div>
        </div>
      </div>
      <div className="my_account_info_item_container">
        <div className="sub_heading my_account_info_item_title">Organization Information</div>
        <div className="my_account_info_item_wrap">
          <div className="my_account_info_item start">
            <img src={sms} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Email Address</div>
              <div className="my_account_info_item_text">
                georgebaskerville@oaksintelligence.com
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img src={call} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Phone Number</div>
              <div className="my_account_info_item_text">+1 260 799 9872</div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendar}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Member since</div>
              <div className="my_account_info_item_text">4th January 2021</div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendar}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Member since</div>
              <div className="my_account_info_item_text">4th January 2021</div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendar}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Member since</div>
              <div className="my_account_info_item_text">4th January 2021</div>
            </div>
          </div>
        </div>
      </div>
      <div className="my_account_info_item_container">
        <div className="sub_heading my_account_info_item_title">Payment Details</div>
        <div className="my_account_info_item_wrap">
          <div className="my_account_info_item start">
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Account Name</div>
              <div className="my_account_info_item_text">
                Oaks Intelligence Limited
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Account Number</div>
              <div className="my_account_info_item_text">3426245267</div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Bank Name</div>
              <div className="my_account_info_item_text">United Bank of Oaks Intelligence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountInfo;
