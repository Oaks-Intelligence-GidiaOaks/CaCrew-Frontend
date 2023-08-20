import React from "react";
import "./TransactionDatabase.scss";
import { TransDatabaseBanner } from "components";

const TransactionDatabase = () => {
  return (
    <div className="trans_db">
      <div className="dash_pad">
        <TransDatabaseBanner />
      </div>
    </div>
  );
};

export default TransactionDatabase;
