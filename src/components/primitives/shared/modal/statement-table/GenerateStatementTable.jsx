import React from "react";
import "./GenerateStatementTable.scss";
import { Form, Field, FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { close } from "assets/images";

const GenerateStatementTable = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const dummyTransactions = [
    {
      _id: "123456",
      buyer: { organization_name: "BuyerOrg1" },
      seller: { organization_name: "SellerOrg1" },
      amount: 1000,
      transaction_fee: 50,
      transaction_type: "SomeType",
      createdAt: new Date().toISOString(),
      status: "Completed",
      document_url: "#",
    },
    {
      _id: "123456",
      buyer: { organization_name: "BuyerOrg1" },
      seller: { organization_name: "SellerOrg1" },
      amount: 1000,
      transaction_fee: 50,
      transaction_type: "SomeType",
      createdAt: new Date().toISOString(),
      status: "Completed",
      document_url: "#",
    },
    {
      _id: "123457",
      buyer: { organization_name: "BuyerOrg1" },
      seller: { organization_name: "SellerOrg1" },
      amount: 1000,
      transaction_fee: 50,
      transaction_type: "SomeType",
      createdAt: new Date().toISOString(),
      status: "Completed",
      document_url: "#",
    },
    {
      _id: "123458",
      buyer: { organization_name: "BuyerOrg1" },
      seller: { organization_name: "SellerOrg1" },
      amount: 1000,
      transaction_fee: 50,
      transaction_type: "SomeType",
      createdAt: new Date().toISOString(),
      status: "Completed",
      document_url: "#",
    },
  ];

  return (
    <div className="modal_generate_statement-table">
      <div className="modal_generate_statement_title sub_heading">
        Transaction Statement
      </div>
      <img
        src={close}
        alt="icon"
        className="modal_generate_statement_close"
        onClick={handleCloseModal}
      />
      <div className="modal_generate_statement_info_wrap ">
        <div className="modal_generate_statement_info_bold between">
          My Statement of Account
          <span>
            <button className="export-btn">Export Statement</button>
          </span>
        </div>
      </div>
      <div className="modal_generate_statement_input_warp">
        <div className="modal_generate_statement_input">
          <div className="dashboard_table">
            <div className="dashboard_table_wrap">
              <div className="dashboard_table">
                <div className="dashboard_table_head between">
                  <div className="dashboard_table_head_item">Buyer</div>
                  <div className="dashboard_table_head_item">Seller</div>
                  <div className="dashboard_table_head_item">Amount</div>
                  <div className="dashboard_table_head_item">
                    Transaction ID
                  </div>
                  <div className="dashboard_table_head_item">
                    Time of Transaction
                  </div>
                  <div className="dashboard_table_head_item">Status</div>
                </div>
                {dummyTransactions.map((row, idx) => (
                  <div
                    key={row._id}
                    className={`dashboard_table_body between ${
                      (idx + 1) % 2 === 0 && "dashboard_table_body_bg"
                    }`}
                  >
                    <div className="dashboard_table_body_item">
                      {row.buyer.organization_name}
                    </div>
                    <div className="dashboard_table_body_item">
                      {row.seller.organization_name}
                    </div>
                    <div className="dashboard_table_body_item">
                      {row.amount}
                    </div>
                    <div className="dashboard_table_body_item">{row._id}</div>
                    <div className="dashboard_table_body_item">
                      {new Date(row.createdAt).toLocaleString()}
                    </div>
                    <div className="dashboard_table_body_item">
                      {row.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStatementTable;
