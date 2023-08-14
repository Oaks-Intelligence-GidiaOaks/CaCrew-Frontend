import React, { useState } from "react";
import "./DashboardOrganisation.scss";
import {
  useUnverifiedOrganisationQuery,
  useVerifiedOrganisationQuery,
} from "services/organisation.service";
// import { formatErrorResponse } from "utils/formatErrorResponse";
import { Pagination, SearchInput, Shimmer, TableAccordion } from "components";
import { organisationApiSlice } from "services/organisation.service";

// fixedCacheKey: organisationApi.reducerPath,
// }

const DashboardOrganisation = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pageUnVerified, setPageUnVerified] = useState(1);
  const [pageVerified, setPageVerified] = useState(1);

  const {
    isLoading: unverifiedLoad,
    error: unverifiedError,
    data: unverifiedData,
  } = useUnverifiedOrganisationQuery({ page: pageUnVerified });
  const {
    isLoading: verifiedLoad,
    error: verifiedError,
    data: verifiedData,
  } = useVerifiedOrganisationQuery({ page: pageVerified });

  const data = activeTab === "pending" ? unverifiedData : verifiedData;
  const page = activeTab === "pending" ? pageUnVerified : pageVerified;
  const setPage = activeTab === "pending" ? setPageUnVerified : setPageVerified;

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  console.log(data, "allOrg");

  return (
    <div className="dashboard_organisation dash_pad">
      <div className="dashboard_organisation_wrap between">
        <div className="dashboard_organisation_btn_wrap">
          <div className="dashboard_organisation_title">
            Verify Organization
          </div>
        </div>
        <div className="dashboard_organisation_search">
          <SearchInput />
        </div>
      </div>
      <div className="dashboard_organisation_tab between">
        <div
          className={`dashboard_organisation_tab_item ${
            activeTab === "pending" && "dashboard_organisation_tab_item_active"
          }`}
          onClick={() => handleTabClick("pending")}
        >
          Pending Verification
        </div>
        <div
          className={`dashboard_organisation_tab_item ${
            activeTab === "verified" && "dashboard_organisation_tab_item_active"
          }`}
          onClick={() => handleTabClick("verified")}
        >
          Verified Organizations
        </div>
      </div>
      <div className="dashboard_organisation_review">
        <div className="dashboard_organisation_table">
          <div className="dashboard_organisation_table_head between">
            <div className="dashboard_organisation_table_head_item">
              Name of Company
            </div>
            <div className="dashboard_organisation_table_head_item">
              Company Email
            </div>
            <div className="dashboard_organisation_table_head_item">
              Industry
            </div>
            <div className="dashboard_organisation_table_head_item">Wallet</div>
            <div
              className="dashboard_organisation_table_head_item"
              style={{ width: "30px" }}
            ></div>
          </div>
          {data ? (
            data?.organizations?.map((data) => (
              <div key={data?._id}>
                <TableAccordion data={data} />
              </div>
            ))
          ) : (
            <>
              {Array.from({ length: 10 }, (_, idx) => (
                <div className="mb_10" key={idx}>
                  <Shimmer height={"40px"} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Pagination
        // totalCount={200}
        totalCount={data?.total}
        setPage={setPage}
        page={page}
        dataLength={data?.organizations?.length}
      />
    </div>
  );
};

export default DashboardOrganisation;
