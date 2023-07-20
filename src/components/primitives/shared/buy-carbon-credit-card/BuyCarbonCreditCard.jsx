import React from "react";
import "./BuyCarbonCreditCard.scss";
import { Button } from "components";
import { verify } from "assets/images";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import capitalizeInitials from "utils/capitaliseInitials";

const BuyCarbonCreditCard = ({ data, type }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal({ component: "ModalBuyCarbon", data: data }));
  };

  return (
    <div className="buy_carb_card between">
      <div className="buy_carb_card_info_wrap start">
        <div className="buy_carb_card_info_initials center">
          {capitalizeInitials(data?.organization_id?.organization_name)}
        </div>
        <div className="buy_carb_card_info_text_wrap">
          <div className="buy_carb_card_info_text start">
            <span className="buy_carb_card_info_bold">
              {data?.organization_id?.organization_name || "----"}
            </span>
            {data?.organization_id?.isVerified && (
              <img src={verify} alt="icon" />
            )}
          </div>
          <div className="buy_carb_card_info_text">
            <span className="buy_carb_card_info_normal">421 Trades</span>
            <span className="buy_carb_card_info_normal buy_carb_card_info_borderb">
              Registered:{" "}
              {data?.organization_id?.date_of_incorporation || "---"}
            </span>
            <span className="buy_carb_card_info_normal buy_carb_card_info_borderr">
              Industry: {data?.organization_id?.industry_type || "---"}
            </span>
            <span
              className="buy_carb_card_info_normal"
              style={{ paddingLeft: "10px" }}
            >
              United Kingdom
            </span>
          </div>
          <div className="buy_carb_card_info_text">
            {type === "buy" && (
              <>
                {" "}
                <span
                  className="buy_carb_card_info_normal"
                  style={{ paddingRight: "10px" }}
                >
                  Minimum Sale Available:{" "}
                  {data?.minimum_sale_unit +
                    " tCO2e" || "-"}
                </span>
              </>
            )}
            <span className="buy_carb_card_info_normal">
              Price: {data?.amount_per_unit || "-"} per tCO2e
            </span>
          </div>
        </div>
      </div>
      <div className="buy_carb_card_btn_wrap">
        <div className="buy_carb_card_text">
          {type === "buy"
            ? data?.available_to_sale
            : data?.carbon_credit_quantity || "---"}{" "}
          tCO2e
        </div>
        <Button
          text={type === "buy" ? "Buy" : "Sell"}
          className={"buy_carb_card_btn"}
          onClick={handleOpenModal}
        />
      </div>
    </div>
  );
};

export default BuyCarbonCreditCard;
