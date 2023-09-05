import React, { useState } from "react";
import "./RegistryTable.scss";
import { Button, Input, Pagination, SearchInput, Shimmer } from "components";
import { useGetRegistryQuery } from "services/registry.service";
import { convertDateToWord } from "utils/convertToDateFormat";
import { Link } from "react-router-dom";
import { regimg } from "assets/images";
import { Form, Field, FormSpy } from "react-final-form";
import useDebounce from "hooks/useDebounce";

const RegistryTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(1);

  const searchValue = useDebounce(search, 2000);

  const { data: dataRegistry } = useGetRegistryQuery({
    page,
    search: searchValue,
  });

  const onSubmit = (value) => {
    console.log(value);
  };
  console.log(searchValue, "trans");

  return (
    <div className="registry_table">
      <div className="registry_search center col">
        <img src={regimg} alt="banner" className="registry_search_img" />
        <div className="registry_search_head">
          Track Carbon Credit Life Cycle
        </div>
        <div className="registry_search_text text">
          Search by Certificate ID
        </div>
        <div className="registry_search_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="search"
                  render={({ input }) => <SearchInput input={input} />}
                />
                <FormSpy
                  subscription={{ values: true }}
                  onChange={(props) => {
                    const val = props.values;
                    setSearch(val.search);
                  }}
                />
              </form>
            )}
          />
        </div>
      </div>
      <div className="registry_table_wrap">
        <div className="registry_table">
          <div className="registry_table_head between">
            <div className="registry_table_head_item">ID</div>
            <div className="registry_table_head_item">Organisation</div>
            <div className="registry_table_head_item">Amount</div>
            <div className="registry_table_head_item">Project</div>
            <div className="registry_table_head_item">Created</div>
          </div>
          {dataRegistry?.registry?.length >= 1 ? (
            dataRegistry?.registry?.map((row, idx) => (
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
                <div className="registry_table_body_item">
                  {row?.project_id?.project_name || "------"}
                </div>
                <div className="registry_table_body_item">
                  {convertDateToWord(row?.createdAt) || "------"}
                </div>
              </Link>
            ))
          ) : dataRegistry?.registry?.length < 1 ? (
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
      {dataRegistry?.registry && (
        <Pagination
          totalCount={dataRegistry?.total}
          page={page}
          setPage={setPage}
          dataLength={dataRegistry?.registry?.length}
          limit={20}
        />
      )}
    </div>
  );
};

export default RegistryTable;
