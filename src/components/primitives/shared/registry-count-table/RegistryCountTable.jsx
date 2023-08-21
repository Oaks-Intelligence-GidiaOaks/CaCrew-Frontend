import React, { useState } from "react";
import "./RegistryCountTable.scss";
import { Button, Input, Pagination, SearchInput, Shimmer } from "components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const RegistryCountTable = ({data}) => {
  const [page, setPage] = useState(1);

  const {id} = useParams()

  return (
    <div className="registry_table">
      <div className="registry_table_wrap">
        <div className="registry_table">
          <div className="registry_table_head between">
            <div className="registry_table_head_item">ID</div>
            <div className="registry_table_head_item">Organisation</div>
            <div className="registry_table_head_item">Amount</div>
          </div>
          {data?.length >= 1 ? (
            data?.map((row, idx) => (
              <Link
               to={`/dashboard-registry/detail/${row?.certificate_number}`}
                key={row?._id || idx}
                className={`registry_table_body link between ${
                  (idx + 1) % 2 === 0 && "registry_table_body_bg"
                }`}
              >
                <div className="registry_table_body_item">
                  {id || "------"}
                </div>
                <div className="registry_table_body_item">
                  {row?.organization_name || "------"}
                </div>
                <div className="registry_table_body_item">
                  {row?.count || "------"}
                </div>
              </Link>
            ))
          ) : data?.transactions?.length < 1 ? (
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
      {data?.transactions && (
        <Pagination
          totalCount={data?.totalTransactions}
          page={page}
          setPage={setPage}
          dataLength={data?.transactions?.length}
        />
      )}
    </div>
  );
};

export default RegistryCountTable;
