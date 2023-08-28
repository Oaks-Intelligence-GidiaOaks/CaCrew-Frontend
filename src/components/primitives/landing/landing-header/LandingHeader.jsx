import React from "react";
import "./LandingHeader.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { avartar, logoland } from "assets/images";
import { Button, MenuBars } from "components";
import Container from "components/guards/wrapper/Container";

const LandingHeader = ({ menuIsOpen, setMenuIsOpen }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="landing_header">
      <Container>
        <div className="landing_header_wrap between">
          <Link to={"/"} className="landing_header_logo center link">
            {/* <span className="landing_header_logo_bold">Carbon</span>Nible */}
            <img
              src={logoland}
              className="landing_header_logo_img"
              alt="logo"
            />
            <div className="landing_header_logo_bold">Carbonible</div>
          </Link>
          <div className="landing_logowrap center">
            <div className="landing_logowrap_links start">
              <div className="landing_header_text">Home</div>
              <div className="landing_header_text">About</div>
              <div className="landing_header_text">Registry</div>
            </div>
            {user && (
              <Link
              to={"/dashboard"}
                className="landing_header_textbtn_wrap center link"
              >
                <img
                  src={user?.photo_url || avartar}
                  alt="icon"
                  className="landing_avartar"
                />
                {/* <div className="landing_header_text">{user?.name}</div> */}
              </Link>
            )}
            {!user && (
              <div className="landing_btn_wrap between">
                <Link to={"/login"} className="link">
                  <Button text={"Login"} className={"landing_btn_one"} />
                </Link>
                <Link to={"/register-company"} className="link">
                  <Button text={"Sign Up"} className={"landing_btn_two"} />
                </Link>
              </div>
            )}
            <div className="landing_header_menu">
              <MenuBars isOpen={menuIsOpen} handleClick={setMenuIsOpen} />
            </div>
            {/* <Link to={"/register_company"} className="link">
          <img src={cart} alt="icon" className="landing_icon" />
        </Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingHeader;
