import React from "react";
import "./StaffDashBanner.scss";
import { useGetUserQuery } from "services/user.service";
import { avartar } from "assets/images";
import { Shimmer } from "components";

const StaffDashBanner = () => {
  const { data: user } = useGetUserQuery();
  return (
    <div className="staff_banner between">
      <div className="staff_banner_name_wrap start">
        <img
          src={user?.photo_url || avartar}
          alt="avatar"
          className="staff_banner_img"
        />
        <div className="staff_banner_name">
          {user ? user?.name : <Shimmer height={"20px"} width={"100px"} />}
        </div>
      </div>
      <div className="staff_banner_title_wrap">
        <div className="text staff_banner_title">Organization</div>
        <div className="staff_banner_val ">
          {user ? (
            user?.organization_id?.organization_name
          ) : (
            <Shimmer height={"20px"} width={"100px"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDashBanner;
