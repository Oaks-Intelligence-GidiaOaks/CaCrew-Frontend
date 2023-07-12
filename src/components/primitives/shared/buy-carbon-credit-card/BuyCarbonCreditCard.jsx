import React from "react";
import "./BuyCarbonCreditCard.scss";
import { Button } from "components";
import { verify } from "assets/images";

const BuyCarbonCreditCard = ({data, type}) => {
  return (
    <div className="buy_carb_card between">
      <div className="buy_carb_card_info_wrap start">
        <div className="buy_carb_card_info_initials center">AK</div>
        <div className="buy_carb_card_info_text_wrap">
          <div className="buy_carb_card_info_text start">
            <span className="buy_carb_card_info_bold">Agroventure Kapital</span>
            <img src={verify} alt="icon" />
          </div>
          <div className="buy_carb_card_info_text">
            <span className="buy_carb_card_info_normal">421 Trades</span>
            <span className="buy_carb_card_info_normal buy_carb_card_info_borderb">Registered: 02/05/2022</span>
            <span className="buy_carb_card_info_normal buy_carb_card_info_borderr">Industry: Agriculture</span>
            <span className="buy_carb_card_info_normal" style={{paddingLeft: "10px"}}>United Kingdom</span>
          </div>
          <div className="buy_carb_card_info_text">
            <span className="buy_carb_card_info_normal" style={{paddingRight: "10px"}}>Minimum Sale Available: 20,500 tCO2e</span>
            <span className="buy_carb_card_info_normal">Price: £50 per tCO2e</span>
          </div>
        </div>
      </div>
      <div className="buy_carb_card_btn_wrap">
        <div className="buy_carb_card_text">
            650,000 tCO2e
        </div>
        <Button text={type === "buy" ? "Buy" : "Sell"} className={"buy_carb_card_btn"}/>
      </div>
    </div>
  );
};

export default BuyCarbonCreditCard;
