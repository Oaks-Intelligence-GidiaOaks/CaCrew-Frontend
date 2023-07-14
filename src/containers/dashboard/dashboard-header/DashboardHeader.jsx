import React, { useEffect } from "react";
import "./DashboardHeader.scss";
import { Link } from "react-router-dom";
import { avartar, cart, down, message, settings } from "assets/images";
import { useGetUserQuery } from "services/user.service";
import { useSelector, useDispatch } from "react-redux";
// import { openModal } from "redux/slices/modal.slice";
// import { ModalBuyCarbon, ModalSellCarbon, MakePayment } from "components";

const DashboardHeader = () => {
  // const {data} = useGetUserQuery();
  // const dispatch = useDispatch();
  // const handle = () => {
  //   dispatch(openModal({ component: "MakePayment" }));
  // };

  const data = useSelector((state) => state.user.user);
  useGetUserQuery();

  // console.log(isLoading, data, "headers");

  return (
    <div className="dashboard_header between">
      <div className="dashboard_header_logo">
        <span className="dashboard_header_logo_bold">Ca</span>Crew
      </div>
      <div className="dashboard_logowrap center">
        <Link
          to={"/register-company"}
          className="dashboard_header_textbtn_wrap center link"
        >
          <img src={avartar} alt="icon" className="dashboard_avartar" />
          <div className="dashboard_header_text">{data?.name}</div>
          <img src={down} alt="icon" className="dashboard_down_icon" />
        </Link>
        <Link to={"/register_company"} className="link">
          <img src={settings} alt="icon" className="dashboard_icon" />
        </Link>
        <Link to={"/register_company"} className="link">
          <img src={message} alt="icon" className="dashboard_icon" />
        </Link>
        {/* <Link to={"/register_company"} className="link">
          <img src={cart} alt="icon" className="dashboard_icon" />
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
