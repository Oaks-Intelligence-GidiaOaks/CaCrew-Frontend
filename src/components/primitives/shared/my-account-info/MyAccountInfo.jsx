import React from "react";
import "./MyAccountInfo.scss";
import { useGetUserQuery } from "services/user.service";
import { useAllStaffsQuery } from "services/staff.service";
import {
  avartar,
  crown,
  verify,
  sms,
  calendarblue,
  call,
  edit,
  accplaceh,
  buildings,
  buildingstwo,
  staffblue,
  global,
} from "assets/images";
import { Badge } from "components";
import { useSelector, useDispatch } from "react-redux";
import { convertDateToWord } from "utils/convertToDateFormat";
import { openModal } from "redux/slices/modal.slice";

const MyAccountInfo = () => {
  const { data } = useGetUserQuery();
  const { data: staffs } = useAllStaffsQuery();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleOpenProfileUpdateModal = () => {
    dispatch(openModal({ component: "UpdateProfileModal" }));
  };
  const handleOpenOrganisationUpdateModal = () => {
    dispatch(openModal({ component: "UpdateOrganisationModal" }));
  };

  return (
    <div className="my_account_info">
      <div className="my_account_info between">
        <img src={data?.photo_url || avartar} alt="avartar" className="my_account_info_avartar" />
        <div className="my_account_info_detail_wrap_inner">
          <div className="my_account_info_name">{data?.name}</div>
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
            {data?.organization_id?.isVerified && (
              <div className="my_account_info_btn">
                <Badge text={"Verified"} image={verify} />
              </div>
            )}
            {(data?.role === "OrgAdmin" || data?.role === "SuperAdmin") && (
              <div className="my_account_info_btn">
                <Badge text={"Admin"} image={crown} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my_account_info_item_container">
        <div className="between my_account_info_item_edit_wrap">
          <div className="sub_heading my_account_info_item_title">
            My Information
          </div>
          {(user?.role === "OrgAdmin" || user?.role === "SuperAdmin") && (
            <div
              className="center text my_account_info_item_edit"
              onClick={handleOpenProfileUpdateModal}
            >
              <span>Edit</span>{" "}
              <img src={edit} alt="icon" className="edit_image" />
            </div>
          )}
        </div>
        <div className="my_account_info_item_wrap">
          <div className="my_account_info_item start">
            <img src={sms} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Email Address</div>
              <div className="my_account_info_item_text">
                {data?.email || "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img src={call} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Phone Number</div>
              <div className="my_account_info_item_text">
                {data?.phone_number || "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendarblue}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Member since</div>
              <div className="my_account_info_item_text">
                {convertDateToWord(data?.createdAt || "-----")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my_account_info_item_container">
        <div className="between my_account_info_item_edit_wrap">
          <div className="sub_heading my_account_info_item_title">
            Organisation Information
          </div>
          {(user?.role === "OrgAdmin" || user?.role === "SuperAdmin") && (
            <div
              className="center text my_account_info_item_edit"
              onClick={handleOpenOrganisationUpdateModal}
            >
              <span>Edit</span>{" "}
              <img src={edit} alt="icon" className="edit_image" />
            </div>
          )}
        </div>
        <div className="my_account_info_item_wrap">
          <div className="my_account_info_item start">
            <img
              src={buildings}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Name of Company</div>
              <div className="my_account_info_item_text">
                {data?.organization_id?.organization_name || "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={buildingstwo}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Industry</div>
              <div className="my_account_info_item_text">
                {data?.organization_id?.industry_type || "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={calendarblue}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Verified On</div>
              <div className="my_account_info_item_text">
                {convertDateToWord(data?.organization_id?.verified_on) ||
                  "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img src={global} alt="icon" className="my_account_info_item_img" />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">Website</div>
              <div className="my_account_info_item_text">
                {data?.organization_id?.company_website || "-----"}
              </div>
            </div>
          </div>
          <div className="my_account_info_item start">
            <img
              src={staffblue}
              alt="icon"
              className="my_account_info_item_img"
            />
            <div className="my_account_info_item_text_wrap">
              <div className="my_account_info_item_text">
                Total Staff Number
              </div>
              <div className="my_account_info_item_text">
                {staffs?.length || "-----"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my_account_info_item_container">
        <div className="between my_account_info_item_edit_wrap">
          <div className="sub_heading my_account_info_item_title">
            Payment Information
          </div>
          {/* {user?.role === "OrgAdmin" && (
            <div className="center text my_account_info_item_edit">
              <span>Edit</span> <img src={edit} alt="icon" className="edit_image" />
            </div>
          )} */}
        </div>
        <div className="my_account_info_item_wrap">
          {data?.organization_id?.account_number ? (
            <>
              <div className="my_account_info_item start">
                <div className="my_account_info_item_text_wrap">
                  <div className="my_account_info_item_text">Account Name</div>
                  <div className="my_account_info_item_text">
                    {data?.organization_id?.account_name}
                  </div>
                </div>
              </div>
              <div className="my_account_info_item start">
                <div className="my_account_info_item_text_wrap">
                  <div className="my_account_info_item_text">
                    Account Number
                  </div>
                  <div className="my_account_info_item_text">
                    {data?.organization_id?.account_number}
                  </div>
                </div>
              </div>
              <div className="my_account_info_item start">
                <div className="my_account_info_item_text_wrap">
                  <div className="my_account_info_item_text">Bank Name</div>
                  <div className="my_account_info_item_text">
                    {data?.organization_id?.bank}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="center col noaccount">
              <img
                src={accplaceh}
                alt="placeholder"
                className="noaccount_img"
              />
              <div className="noaccount_text text">
                Company Bank information Not Added yet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccountInfo;
