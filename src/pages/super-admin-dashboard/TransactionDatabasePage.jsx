import React from "react";
import { Dashboard, TransactionDatabase } from "containers";

const TransactionDatabasePage = () => {
  return (
    <>
      <Dashboard component={TransactionDatabase} />
    </>
  );
};

export default TransactionDatabasePage;
