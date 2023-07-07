import React, { useState } from "react";
import "./DashboardOrganisation.scss";
import {
  useUnverifiedOrganisationQuery,
  useVerifiedOrganisationQuery,
} from "services/organisation.service";
// import { formatErrorResponse } from "utils/formatErrorResponse";
import { SearchInput, TableAccordion } from "components";

// fixedCacheKey: organisationApi.reducerPath,
// }

const DashboardOrganisation = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const {
    isLoading: unverifiedLoad,
    error: unverifiedError,
    data: unverifiedData,
  } = useUnverifiedOrganisationQuery({providesTags: ["Organisation"],});
  const {
    isLoading: verifiedLoad,
    error: verifiedError,
    data: verifiedData,
  } = useVerifiedOrganisationQuery({providesTags: ["Organisation"],});

  const data = activeTab === "pending" ? unverifiedData : verifiedData;

  const handleTabClick = (value) => {
    setActiveTab(value);
    
  };

  console.log(data, "allOrg");

  return (
    <div className="dashboard_organisation">
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
          {data?.organizations?.map((data) => (
            <div key={data?._id}>
            <TableAccordion data={data}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganisation;
