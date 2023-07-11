import React, {useState} from "react";
import "./DashboardWalletTable.scss";
import { Button, Input, SearchInput } from "components";
import { Form, Field } from "react-final-form";

const DashboardWalletTable = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (value) => {
    setActiveTab(value);
    
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="dashboard_table">
      <div className="dashboard_table_search between">
        <div className="dashboard_table_title sub_heading">
          Latest Operations
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="dashboard_table_search_wrap start"
            >
              <div className="dashboard_table_search_item">
                <Field
                  name="status"
                  placeholder={"Filter By Status"}
                  select
                  selectDefault={"Filter By Status"}
                  className="dashboard_table_input"
                  options={{
                    Approved: "Approved",
                    Pending: "Pending",
                    Failed: "Failed",
                  }}
                  component={Input}
                />
              </div>
              <div className="dashboard_table_search_item">
                <Field name="search" component={SearchInput} />
              </div>
              <div className="dashboard_table_search_item">
                <Button
                  type={"submit"}
                  text={"Search"}
                  className={"dashboard_table_search_btn"}
                />
              </div>
            </form>
          )}
        />
      </div>
      <div className="dashboard_table_tab between">
        <div
          className={`dashboard_table_tab_item ${
            activeTab === "all" && "dashboard_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("all")}
        >
          All Transactions
        </div>
        <div
          className={`dashboard_table_tab_item ${
            activeTab === "sell" && "dashboard_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("sell")}
        >
          Sell History
        </div>
        <div
          className={`dashboard_table_tab_item ${
            activeTab === "buy" && "dashboard_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("buy")}
        >
          Buy History
        </div>
        <div
          className={`dashboard_table_tab_item ${
            activeTab === "retire" && "dashboard_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("retire")}
        >
          Retire History
        </div>
      </div>
      <div className="dashboard_table_wrap">
        <div className="dashboard_table">
          <div className="dashboard_table_head between">
            <div className="dashboard_table_head_item">
              Name of Organization
            </div>
            <div className="dashboard_table_head_item">Amount</div>
            <div className="dashboard_table_head_item">Transaction ID</div>
            <div className="dashboard_table_head_item">Email</div>
            <div className="dashboard_table_head_item">Time of Transaction</div>
            <div className="dashboard_table_head_item">Status</div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7]?.map((row, idx) => (
            <div
              key={row?._id}
              className={`dashboard_table_body between ${
                (idx + 1) % 2 === 0 && "dashboard_table_body_bg"
              }`}
            >
              <div className="dashboard_table_body_item">{"Agroventure Kapital"}</div>
              <div className="dashboard_table_body_item">{row?._id || "760 tCO2e"}</div>
              <div className="dashboard_table_body_item">{row?.createdAt || "KLM 814 813 0034"}</div>
              <div className="dashboard_table_body_item">
                {row?.originator?.name || "agroventurekapital@example.com"}
              </div>
              <div className="dashboard_table_body_item">
                {row?.amount_earned || "11:10am  06/06/2023"}
              </div>
              <a href={row?.document_url} className={`dashboard_table_body_item center dashboard_table_body_item_${"Approved".toLowerCase()}`}>
                {"Approved"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWalletTable;
