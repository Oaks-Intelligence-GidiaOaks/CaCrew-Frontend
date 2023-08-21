import React from "react";
import "./RegistryBanner.scss";
import { regimg } from "assets/images";

const RegistryBanner = () => {
  return (
    <div className="reg_banner between">
      <div className="sub_heading">Registry</div>
      <img src={regimg} alt="banner" className="reg_banner_img"/>
    </div>
  );
};

export default RegistryBanner;
