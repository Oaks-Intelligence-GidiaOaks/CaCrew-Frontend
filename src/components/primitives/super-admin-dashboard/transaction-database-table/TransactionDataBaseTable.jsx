import React, { useState } from "react";
import "./TransactionDataBaseTable.scss";
import { Input, Pagination, Shimmer } from "components";
import { Form, Field, FormSpy } from "react-final-form";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useGetUserQuery } from "services/user.service";
import { useAllTransactionsQuery } from "services/transaction.service";
import { convertDateToWord } from "utils/convertToDateFormat";

const TransactionDataBaseTable = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(null);

  const type =
    activeTab === "sell"
      ? "sell"
      : activeTab === "buy"
      ? "buy"
      : activeTab === "retire"
      ? "retire"
      : null;
  const { data: userData } = useGetUserQuery();
  const { data: dataMyTranscation } = useAllTransactionsQuery({
    page,
    type,
    status,
  });

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

  console.log(dataMyTranscation, "trans");

  return (
    <div className="trans_db_table">
      {/* <div className="trans_db_table_search between">
        <div className="trans_db_table_title sub_heading">
          Latest Operations
        </div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="trans_db_table_search_wrap start"
            >
              <div className="trans_db_table_search_item">
                <Field
                  name="status"
                  placeholder={"Filter By Status"}
                  select
                  selectDefault={"Filter By Status"}
                  className="trans_db_table_input"
                  options={{
                    Completed: "Completed",
                    Pending: "Pending",
                    Failed: "Failed",
                  }}
                  component={Input}
                />
              </div>
              <div className="trans_db_table_search_item">
                <Field name="search" component={SearchInput} />
              </div>
              <div className="trans_db_table_search_item">
                <Button
                  type={"submit"}
                  text={"Search"}
                  className={"trans_db_table_search_btn"}
                />
              </div>
              <FormSpy
                subscription={{ values: true }}
                onChange={(props) => {
                  const val = props.values;
                  setStatus(val.status)
                  console.log(val, "file");
                }}
              />
            </form>
          )}
        />
      </div> */}
      <div className="trans_db_table_tab between">
        <div
          className={`trans_db_table_tab_item ${
            activeTab === "all" && "trans_db_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("all")}
        >
          All Transactions
        </div>
        <div
          className={`trans_db_table_tab_item ${
            activeTab === "sell" && "trans_db_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("sell")}
        >
          Sell History
        </div>
        <div
          className={`trans_db_table_tab_item ${
            activeTab === "buy" && "trans_db_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("buy")}
        >
          Buy History
        </div>
        <div
          className={`trans_db_table_tab_item ${
            activeTab === "retire" && "trans_db_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("retire")}
        >
          Retire History
        </div>
      </div>
      <div className="trans_db_table_wrap">
        <div className="trans_db_table">
          <div className="trans_db_table_head between">
            <div className="trans_db_table_head_item">Buyer</div>
            <div className="trans_db_table_head_item">Seller</div>
            <div className="trans_db_table_head_item">Type</div>
            <div className="trans_db_table_head_item">Amount</div>
            <div className="trans_db_table_head_item">Transaction ID</div>
            <div className="trans_db_table_head_item">Time of Transaction</div>
            <div className="trans_db_table_head_item">Status</div>
          </div>
          {dataMyTranscation?.transactions?.length >= 1 ? (
            dataMyTranscation?.transactions?.map((row, idx) => (
              <div
                key={row?._id || idx}
                className={`trans_db_table_body between ${
                  (idx + 1) % 2 === 0 && "trans_db_table_body_bg"
                }`}
                onClick={() => handleOpenModal(row)}
              >
                <div className="trans_db_table_body_item">
                  {row?.buyer?.organization_name ||
                    row?.transaction_type ||
                    "Transaction fee"}
                </div>
                <div className="trans_db_table_body_item">
                  {row?.seller?.organization_name ||
                    row?.transaction_type ||
                    "Transaction fee"}
                </div>
                <div className="trans_db_table_body_item">
                  {row?.transaction_type || "Transaction"}
                </div>
                <div className="trans_db_table_body_item">
                  {row?.amount + row?.transaction_fee || row?.amount}
                </div>
                <div className="trans_db_table_body_item">{row?._id}</div>
                <div className="trans_db_table_body_item">
                  {convertDateToWord(row?.createdAt)}
                </div>
                <a
                  href={row?.document_url}
                  className={`trans_db_table_body_item center trans_db_table_body_item_${row?.status?.toLowerCase()}`}
                >
                  {row?.status}
                </a>
              </div>
            ))
          ) : dataMyTranscation?.transactions?.length < 1 ? (
            <div className="text center mt_10">No Transactions yet</div>
          ) : (
            <div className="mt_10">
              {Array.from({ length: 10 }, (_, idx) => (
                <div className="mb_10" key={idx}>
                  <Shimmer height={"40px"} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {dataMyTranscation?.transactions && (
        <Pagination
          totalCount={dataMyTranscation?.totalTransactions}
          page={page}
          setPage={setPage}
          dataLength={dataMyTranscation?.transactions?.length}
        />
      )}
    </div>
  );
};

export default TransactionDataBaseTable;
