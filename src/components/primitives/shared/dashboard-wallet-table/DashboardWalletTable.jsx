import React, { useState } from "react";
import "./DashboardWalletTable.scss";
import { Button, Input, SearchInput } from "components";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useGetUserQuery } from "services/user.service";

const DashboardWalletTable = ({ data }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");

  const { data: userData } = useGetUserQuery();

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleOpenModal = (data) => {
    data?.seller?._id === userData?.organization_id?._id
      ? dispatch(
          openModal({
            component: "ConfirmPayment",
            data,
          })
        )
      : data?.buyer?._id === userData?.organization_id?._id
      ? dispatch(
          openModal({
            component: "MakePayment",
            data,
            amount: data?.amount,
            transaction_id: data?._id,
          })
        )
      : console.log(null);
  };

  // const handle = () => {
  //   if (confirm("are you high?")) {.lo
  //     alert("hi");
  //   } else {
  //     alert("bye");
  //   }
  // };

  console.log(data, "trans");

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
            <div className="dashboard_table_head_item">Buyer</div>
            <div className="dashboard_table_head_item">Seller</div>
            <div className="dashboard_table_head_item">Amount</div>
            <div className="dashboard_table_head_item">Transaction ID</div>
            <div className="dashboard_table_head_item">Time of Transaction</div>
            <div className="dashboard_table_head_item">Status</div>
          </div>
          {data?.map((row, idx) => (
            <div
              key={row?._id || idx}
              className={`dashboard_table_body between ${
                (idx + 1) % 2 === 0 && "dashboard_table_body_bg"
              }`}
              onClick={() => handleOpenModal(row)}
            >
              <div className="dashboard_table_body_item">
                {row?.buyer?.organization_name || row?.transaction_type || "Transaction fee"}
              </div>
              <div className="dashboard_table_body_item">
                {row?.seller?.organization_name || row?.transaction_type || "Transaction fee"}
              </div>
              <div className="dashboard_table_body_item">{row?.transaction_fee ? row?.amount - row?.transaction_fee : row?.amount}</div>
              <div className="dashboard_table_body_item">{row?._id}</div>
              <div className="dashboard_table_body_item">{row?.createdAt}</div>
              <a
                href={row?.document_url}
                className={`dashboard_table_body_item center dashboard_table_body_item_${row?.status?.toLowerCase()}`}
              >
                {row?.status}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWalletTable;
