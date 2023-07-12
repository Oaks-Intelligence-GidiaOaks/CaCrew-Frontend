import React from "react";
import "./SuperAdminStatCard.scss";
import {Link} from "react-router-dom";

const SuperAdminStatCard = ({ name, data, link = "", desc, img }) => {
  return (
    <div className="super_stat_card">
      <div className="super_stat_card_name">{name}</div>
      <div className="super_stat_card_wrap center">
        <div className="super_stat_card_text center col">
          <div className="super_stat_card_value">{data ? data : "-"}</div>
          <div className="super_stat_card_value_desc">{desc}</div>
          <Link to={link} className="super_stat_card_value_btn">
            See more
          </Link>
        </div>
        <img src={img} alt="icon" className="super_stat_card_value_img"/>
      </div>
    </div>
  );
};

export default SuperAdminStatCard;
