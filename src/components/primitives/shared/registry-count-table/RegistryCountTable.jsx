import React, { useState } from "react";
import "./RegistryCountTable.scss";
import { Button, Input, Pagination, SearchInput, Shimmer } from "components";
import { useGetRegistryQuery } from "services/registry.service";
import { convertDateToWord } from "utils/convertToDateFormat";
import { Link } from "react-router-dom";

const RegistryCountTable = () => {
  const [page, setPage] = useState(1);
  const { data: dataRegistry } = useGetRegistryQuery({
    page,
  });

  return (
    <div className="registry_table">
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
              <Link
               to={`/dashboard-registry/detail/${row?.certificate_number}`}
                key={row?._id || idx}
                className={`registry_table_body link between ${
                  (idx + 1) % 2 === 0 && "registry_table_body_bg"
                }`}
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
              </Link>
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

export default RegistryCountTable;
