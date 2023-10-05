import React, { useState } from "react";
import "./ProjectDatabase.scss";
import { Button, Input, Pagination, SearchInput, Shimmer } from "components";
import { Form, Field, FormSpy } from "react-final-form";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ProjectDatabase = ({
  data,
  isLoading,
  isError,
  page,
  setPage,
  search,
  setSearch,
}) => {
  const project = data?.finalResult || [];
  const startSerialNumber = (page - 1) * 10;

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const exportPDF = () => {
    let body = [];

    // Add table header
    body.push([
      { text: "Project Name", bold: true },
      { text: "Status", bold: true },
      { text: "Amount Earned", bold: true },
      { text: "Location", bold: true },
      { text: "Organization Name", bold: true },
      { text: "Date of Incorporation", bold: true },
      { text: "Sale Total", bold: true },
      { text: "Retired Total", bold: true },
      { text: "Industry Type", bold: true },
    ]);

    // Add data from transactions
    project.forEach((row) => {
      body.push([
        row.project_name || "-",
        row.status || "-",
        row.amount_earned,
        row.location || "-",
        row.created_by.organization_id.organization_name || "-",
        row.created_by.organization_id.date_of_incorporation,
        row.saleTotal,
        row.retiredTotal,
        row.created_by.organization_id.industry_type,
      ]);
    });

    var docDefinition = {
      pageOrientation: "landscape",
      content: [
        {
          text: "All Project Data",
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 8],
        },
        {
          table: {
            body: body,
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download("project-database.pdf");
  };

  const onSubmit = (value) => {
    console.log(value);
    setSearch(value);
  };

  return (
    <div className="project_database_table">
      <div className="project_database_table_wrap">
        {data?.finalResult?.length > 0 && (
          <button className="export-btn" onClick={exportPDF}>
            Export Statement
          </button>
        )}
        {/* <div className="project_database_search center col">
          <div className="project_database_search_head">
            Search Project Database
          </div>
          <br />
          <div className="project_database_search_input">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="search"
                    render={({ input }) => (
                      <SearchInput
                        input={input}
                        placeholder="Search by project_database, location"
                      />
                    )}
                  />
                  <FormSpy
                    subscription={{ values: true }}
                    onChange={(props) => {
                      const val = props.values;
                      if (val && val.search !== undefined) {
                        setSearch(val.search);
                      }
                    }}
                  />
                </form>
              )}
            />
          </div>
        </div> */}
        <div className="project_database_table">
          <div className="project_database_table_head between">
            <div className="project_database_table_head_item">S/N</div>
            <div className="project_database_table_head_item">Project Name</div>
            <div className="project_database_table_head_item">status</div>
            <div className="project_database_table_head_item">
              Amount Earned
            </div>
            <div className="project_database_table_head_item">Location</div>
            <div className="project_database_table_head_item">
              Organization Name
            </div>
            <div className="project_database_table_head_item">
              Date of Incorporation
            </div>
            <div className="project_database_table_head_item">Sale Total</div>
            <div className="project_database_table_head_item">
              Retired Total
            </div>
            <div className="project_database_table_head_item">
              Industry Type
            </div>
          </div>
          {isLoading ? (
            <div className="mt_10">
              {Array.from({ length: 10 }, (_, idx) => (
                <div className="mb_10" key={idx}>
                  <Shimmer height={"40px"} />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="project_database_table_no_records">
              Error fetching records.
            </div>
          ) : data?.finalResult?.length === 0 ? (
            <div className="text center mt_10">No Records yet</div>
          ) : (
            data?.finalResult?.map((row, idx) => (
              <div
                key={row._id}
                className={`project_database_table_body between ${
                  (idx + 1) % 2 === 0 && "project_database_table_body_bg"
                }`}
              >
                <div className="project_database_table_body_item">
                  {startSerialNumber + idx + 1}
                </div>
                <div className="project_database_table_body_item">
                  {row.project_name}
                </div>
                <div className="project_database_table_body_item">
                  {row.status}
                </div>
                <div className="project_database_table_body_item">
                  {row.amount_earned}
                </div>
                <div className="project_database_table_body_item">
                  {row.location}
                </div>
                <div className="project_database_table_body_item">
                  {row.created_by.organization_id.organization_name}
                </div>
                <div className="project_database_table_body_item">
                  {row.created_by.organization_id.date_of_incorporation}
                </div>
                <div className="project_database_table_body_item">
                  {row.saleTotal}
                </div>
                <div className="project_database_table_body_item">
                  {row.retiredTotal}
                </div>
                <div className="project_database_table_body_item">
                  {row.created_by.organization_id.industry_type}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {data?.finalResult && (
        <Pagination
          totalCount={data?.total}
          page={page}
          setPage={setPage}
          dataLength={data?.finalResult?.length}
          limit={10}
        />
      )}
    </div>
  );
};

export default ProjectDatabase;
