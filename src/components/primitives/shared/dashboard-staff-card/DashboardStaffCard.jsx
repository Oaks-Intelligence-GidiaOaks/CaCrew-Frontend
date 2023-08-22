import React, { useEffect, useState } from "react";
import "./DashboardStaffCard.scss";
import {
  assign,
  avartar,
  call,
  crown,
  crownstaff,
  deletestaff,
  dots,
  sms,
} from "assets/images";
import { Badge } from "components";
import { ThreeDots } from "react-loader-spinner";
import {
  useMakeStaffAdminMutation,
  useRemoveStaffMutation,
} from "services/staff.service";
import rtkMutation from "utils/rtkMutation";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { formatErrorResponse } from "utils/formatErrorResponse";

const DashboardStaffCard = ({ data }) => {
  const [close, setClose] = useState(true);
  const id = data?._id;
  const [
    makeStaffAdmin,
    {
      isLoading: mkAdminLoading,
      isError: mkAdminIsError,
      isSuccess: mkAdminIsSuccess,
      error: mkAdminError,
    },
  ] = useMakeStaffAdminMutation();
  const [
    removeStaff,
    {
      isLoading: rmStaffLoading,
      isError: rmStaffIsError,
      isSuccess: rmStaffIsSuccess,
      error: rmStaffError,
    },
  ] = useRemoveStaffMutation();

  const dispatch = useDispatch();

  console.log(data?._id, "d");

  const handleOptionOpen = () => {
    setClose(!close);
  };

  useEffect(() => {
    mkAdminIsSuccess &&
      dispatch(
        openModal({
          title: "Role Update Successful",
          message: `You have succesfuly made ${data?.name} an Admin`,
          success: true,
        })
      );
    mkAdminIsError &&
      dispatch(
        openModal({
          title: "Role Update Failed",
          message: `${
            formatErrorResponse(mkAdminError) ||
            "An error has occured, please try again later"
          }`,
        })
      );
    rmStaffIsSuccess &&
      dispatch(
        openModal({
          title: "Role Update Successful",
          message: `You have succesfuly made ${data?.name} an Admin`,
          success: true,
        })
      );
    rmStaffIsError &&
      dispatch(
        openModal({
          title: "Role Update Failed",
          message: `${
            formatErrorResponse(rmStaffError) ||
            "An error has occured, please try again later"
          }`,
        })
      );
  }, [
    mkAdminIsSuccess,
    mkAdminIsError,
    mkAdminError,
    rmStaffError,
    rmStaffIsError,
    rmStaffIsSuccess,
  ]);
  return (
    <div className="dashboard_staff_card">
      <div className="dashboard_staff_card_detail_wrap between">
        <div className="dashboard_staff_card_detail start">
          <img
            src={avartar}
            alt="icon"
            className="dashboard_staff_card_detail_img"
          />
          <div className="dashboard_staff_card_detail_namepos">
            <div className="dashboard_staff_card_detail_name">{data?.name}</div>
            <div className="dashboard_staff_card_detail_position">
              {data?.role === "SuperAdmin" || data?.role === "OrgAdmin"
                ? "Admin"
                : data?.designation}
            </div>
          </div>
        </div>
        <div
          className="dashboard_staff_card_detail_options center"
          onClick={handleOptionOpen}
        >
          <img
            src={dots}
            alt="icon"
            className="dashboard_staff_card_detail_options_img"
          />
        </div>
        <div
          className={`dashboard_staff_card_detail_options_open ${
            close && "dashboard_staff_card_detail_options_close"
          }`}
        >
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            onClick={handleOptionOpen}
          >
            <img
              src={assign}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Assign a project
            </span>
          </div>
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            onClick={handleOptionOpen}
          >
            <img
              src={assign}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Track a project
            </span>
          </div>
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            onClick={() => {
              handleOptionOpen();
              rtkMutation(makeStaffAdmin, id);
            }}
          >
            <img
              src={crownstaff}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Make Admin
            </span>
          </div>
          <div
            className="dashboard_staff_card_detail_options_wrap start"
            style={{ border: "none" }}
            onClick={() => {
              handleOptionOpen();
              rtkMutation(removeStaff, id);
            }}
          >
            <img
              src={deletestaff}
              alt="icon"
              className="dashboard_staff_card_detail_options_img"
            />
            <span className="dashboard_staff_card_detail_options_text">
              Remove Staff
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard_staff_card_contact start">
        <img
          src={sms}
          alt="icon"
          className="dashboard_staff_card_contact_img"
        />
        <div className="dashboard_staff_card_contact_namepos">
          <div className="dashboard_staff_card_contact_name">{data?.email}</div>
        </div>
      </div>
      <div className="dashboard_staff_card_contact start">
        <img
          src={call}
          alt="icon"
          className="dashboard_staff_card_contact_img"
        />
        <div className="dashboard_staff_card_contact_namepos">
          <div className="dashboard_staff_card_contact_name">
            {data?.phone_number}
          </div>
        </div>
      </div>
      {(data?.role === "SuperAdmin" || data?.role === "OrgAdmin") && (
        <div className="dashboard_staff_card_badge">
          <Badge text={"Admin"} image={crown} />
        </div>
      )}
      {(mkAdminLoading || rmStaffLoading) && (
        <div className="dashboard_staff_loading center">
          <ThreeDots
            height="25"
            width="25"
            radius="9"
            color={"#143B76"}
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardStaffCard;
