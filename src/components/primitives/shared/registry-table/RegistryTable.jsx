import React, { useState } from "react";
import "./RegistryTable.scss";
import { Button, Input, Pagination, SearchInput, Shimmer } from "components";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useGetUserQuery } from "services/user.service";
import { useGetRegistryQuery } from "services/registry.service";
import { convertDateToWord } from "utils/convertToDateFormat";

const RegistryTable = () => {
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
  const { data: dataRegistry } = useGetRegistryQuery({
    page,
  });

  console.log(dataRegistry, "reg")

  const handleTabClick = (value) => {
    setActiveTab(value);
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

  // console.log(dataMyTranscation, "trans");

  return (
    <div className="registry_table">
      {/* <div className="registry_table_tab between">
        <div
          className={`registry_table_tab_item ${
            activeTab === "all" && "registry_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("all")}
        >
          All Transactions
        </div>
        <div
          className={`registry_table_tab_item ${
            activeTab === "sell" && "registry_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("sell")}
        >
          Sell History
        </div>
        <div
          className={`registry_table_tab_item ${
            activeTab === "buy" && "registry_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("buy")}
        >
          Buy History
        </div>
        <div
          className={`registry_table_tab_item ${
            activeTab === "retire" && "registry_table_tab_item_active"
          }`}
          onClick={() => handleTabClick("retire")}
        >
          Retire History
        </div>
      </div> */}
      <div className="registry_table_wrap">
        <div className="registry_table">
          <div className="registry_table_head between">
            <div className="registry_table_head_item">ID</div>
            <div className="registry_table_head_item">Organisation</div>
            <div className="registry_table_head_item">Amount</div>
            <div className="registry_table_head_item">Project</div>
            <div className="registry_table_head_item">Created</div>
          </div>
          {dataRegistry?.length >= 1 ? (
            dataRegistry?.map((row, idx) => (
              <div
                key={row?._id || idx}
                className={`registry_table_body between ${
                  (idx + 1) % 2 === 0 && "registry_table_body_bg"
                }`}
                onClick={() => handleOpenModal(row)}
              >
                <div className="registry_table_body_item">
                  {row?.certificate_number || "------"}
                </div>
                <div className="registry_table_body_item">
                  {row?.organization_id?.organization_name || "------"}
                </div>
                <div className="registry_table_body_item">
                  {row?.amount || "------"}
                </div>
                <div className="registry_table_body_item">{row?.project_id?.project_name || "------"}</div>
                <div className="registry_table_body_item">
                  {convertDateToWord(row?.createdAt) || "------"}
                </div>
              </div>
            ))
          ) : dataRegistry?.transactions?.length < 1 ? (
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
      {dataRegistry?.transactions && (
        <Pagination
          totalCount={dataRegistry?.totalTransactions}
          page={page}
          setPage={setPage}
          dataLength={dataRegistry?.transactions?.length}
        />
      )}
    </div>
  );
};

export default RegistryTable;
