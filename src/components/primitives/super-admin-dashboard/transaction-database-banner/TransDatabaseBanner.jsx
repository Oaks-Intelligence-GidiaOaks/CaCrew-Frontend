import React from "react";
import "./TransDatabaseBanner.scss";
import { pattern } from "assets/images";
import { useAllTransactionsQuery } from "services/transaction.service";

const TransDatabaseBanner = () => {
  const { data } = useAllTransactionsQuery({});
  console.log(data, "dat")
  return (
    <div className="trans_db_banner">
      <div className="sub_heading trans_db_banner_heading">
        Transaction Database
      </div>
      <div className="trans_db_banner_cards_wrap between">
        <div
          className="trans_db_banner_card center col"
          style={{
            background: "linear-gradient(136deg, #5F41B2 0%, #5F41B2 100%)",
          }}
        >
          <img
            src={pattern}
            alt="pattern"
            className="trans_db_banner_card_img"
          />
          <div className="trans_db_banner_card_title text">
            Total Transactions Volume
          </div>
          <div className="trans_db_banner_card_val">{data?.totalCarbonCredits} tCO2e</div>
        </div>
        <div
          className="trans_db_banner_card center col"
          style={{
            background: "linear-gradient(133deg, #2B5FAD 0%, #0B2D60 100%)",
          }}
        >
          <img
            src={pattern}
            alt="pattern"
            className="trans_db_banner_card_img"
          />
          <div className="trans_db_banner_card_title text">
            Total Active carbon Cretit
          </div>
          <div className="trans_db_banner_card_val">{data?.activeCarbonCredits} tCO2e</div>
        </div>
        <div
          className="trans_db_banner_card center col"
          style={{
            background: "linear-gradient(226deg, #769ce3 0%, #769ce3 38.11%)",
          }}
        >
          <img
            src={pattern}
            alt="pattern"
            className="trans_db_banner_card_img"
          />
          <div className="trans_db_banner_card_title text">
            Total retired Carbon Credit
          </div>
          <div className="trans_db_banner_card_val">{data?.retiredCarbonCredits} tCO2e</div>
        </div>
      </div>
    </div>
  );
};

export default TransDatabaseBanner;
