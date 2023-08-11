import React from "react";
import "./DashboardHeader.scss";
import { Link } from "react-router-dom";
import { avartar, carbon, down, message, settings } from "assets/images";
import { useGetUserQuery } from "services/user.service";
import { useSelector } from "react-redux";
import { MenuBars } from "components";
// import { openModal } from "redux/slices/modal.slice";
// import { ModalBuyCarbon, ModalSellCarbon, MakePayment } from "components";

const DashboardHeader = ({menuIsOpen, setMenuIsOpen}) => {
  // const {data} = useGetUserQuery();
  // const dispatch = useDispatch();
  // const handle = () => {
  //   dispatch(openModal({ component: "MakePayment" }));
  // };

  const data = useSelector((state) => state.user.user);
  const {data: user} = useGetUserQuery();

  // console.log(isLoading, data, "headers");

  return (
    <div className="dashboard_header between">
      <Link to={"/"} className="dashboard_header_logo center col link">
        {/* <span className="dashboard_header_logo_bold">Carbon</span>Nible */}
        <img src={carbon} className="dashboard_header_logo_img" alt="logo" />
        <div className="dashboard_header_logo_bold">Carbonible</div>
      </Link>
      <div className="dashboard_logowrap center">
        <Link
          to={"/my-account"}
          className="dashboard_header_textbtn_wrap center link"
        >
          <img src={user?.photo_url || avartar} alt="icon" className="dashboard_avartar" />
          <div className="dashboard_header_text">{data?.name}</div>
          <img src={down} alt="icon" className="dashboard_down_icon" />
        </Link>
        <Link to={"/my-account"} className="link">
          <img src={settings} alt="icon" className="dashboard_icon" />
        </Link>
        <Link to={"/my-account"} className="link">
          <img src={message} alt="icon" className="dashboard_icon" />
        </Link>
        <div className="dashboard_header_menu">
          <MenuBars isOpen={menuIsOpen} handleClick={setMenuIsOpen}/>
        </div>
        {/* <Link to={"/register_company"} className="link">
          <img src={cart} alt="icon" className="dashboard_icon" />
        </Link> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
