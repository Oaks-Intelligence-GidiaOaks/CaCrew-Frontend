import React from "react";
import "./LandingFooter.scss";
import { logoland } from "assets/images";
import { Button, Container } from "components";

const LandingFooter = () => {
  return (
    <div className="footer">
      <Container>
        <div className="footer_wrap">
          <div className="footer_wrap_logo_con">
            <div className="footer_wrap_logo start">
              <img src={logoland} alt="logo" className="footer_logo_img" />
              <div className="footer_head">Carbonible</div>
            </div>
            <div className="footer_wrap_logo_text">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy. Lorem ipsum dolor sit amet, consectetuer.
            </div>
          </div>
          <div className="footer_wrap_list">
            <div className="footer_wrap_list_item_head">Information</div>
            <div className="footer_wrap_list_item">Help</div>
            <div className="footer_wrap_list_item">Contact</div>
          </div>
          <div className="footer_wrap_list">
            <div className="footer_wrap_list_item_head">About</div>
            <div className="footer_wrap_list_item">Terms of use</div>
            <div className="footer_wrap_list_item">Privacy policy</div>
          </div>
          <div className="footer_wrap_list">
            <div className="footer_wrap_list_item_head">Contact</div>
            <div className="footer_input_wrap between">
              <input type="text" className="footer_input" placeholder="Enter your email"/>
              <Button className={"footer_btn"} text={"Submit"}/>
            </div>
          </div>
        </div>
      </Container>
      <div className="center footer_terms">
        Copyright © Escrow-Tech 2023. All Rights Reserved.
      </div>
    </div>
  );
};

export default LandingFooter;
