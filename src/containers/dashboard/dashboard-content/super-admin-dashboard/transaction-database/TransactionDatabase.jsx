import React from "react";
import "./TransactionDatabase.scss";
import { TransDatabaseBanner, TransactionDataBaseTable } from "components";

const TransactionDatabase = () => {
  return (
    <div className="trans_db">
      <div className="dash_pad">
        <div className="trans_db_banner_wrap">
          <TransDatabaseBanner />
        </div>
        <TransactionDataBaseTable />
      </div>
    </div>
  );
};

export default TransactionDatabase;
