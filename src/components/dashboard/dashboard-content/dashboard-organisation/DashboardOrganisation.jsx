import React from "react";
import "./DashboardOrganisation.scss";
import {
  useAllOrganisationQuery,
  // useVerifyOrganisationMutation,
} from "services/organisation.service";
// import { useDispatch } from "react-redux";
import { formatErrorResponse } from "utils/formatErrorResponse";
import { dots } from "assets/images";
import { useGetUserQuery } from "services/user.service";

// fixedCacheKey: organisationApi.reducerPath,
// }

const DashboardOrganisation = () => {
  // const dispatch = useDispatch();

  const { isLoading, error, data } = useAllOrganisationQuery();
  const { data: userData } = useGetUserQuery();
  // const [
  //   verifyOrganisation,
  //   { isLoading: isLoadingVerify, error: errorVerify, data: dataVerify },
  // ] = useVerifyOrganisationMutation();

  // const handleVerifyOrganisation = (id) => {
  //   verifyOrganisation(id);
  // };

  console.log(formatErrorResponse(error), "tokrn");
  // useEffect(() => {
  //   dispatch(organisationApi.util.resetApiState());
  // }, [data, error, dispatch]);

  console.log(data, isLoading, "allOrg")

  return (
    <div className="dashboard-organisation">
      <div className="dashboard_project_wrap between" style={{background: "#F2F5FF", padding: "20px"}}>
        <div className="dashboard_project_btn_wrap">
          <div className="dashboard_project_title">Organisations</div>
        </div>
        <div className="dashboard_project_organisation">
          <div className="dashboard_project_organisation_title">
            Organization
          </div>
          <div className="dashboard_project_organisation_name">
            {userData?.organization_id?.organization_name}
          </div>
        </div>
      </div>
      <div className="dashboard_project_review">
      <div className="dashboard_project_table">
        <div className="dashboard_project_table_head between">
          <div className="dashboard_project_table_head_item">S/N</div>
          <div className="dashboard_project_table_head_item">
            Name
          </div>
          <div className="dashboard_project_table_head_item">Email</div>
          <div className="dashboard_project_table_head_item">Date</div>
          <div className="dashboard_project_table_head_item">Industry</div>
          <div
            className="dashboard_project_table_head_item"
            style={{ width: "30px" }}
          ></div>
        </div>
        {data?.map((row, idx) => (
          <div
            key={row.sn}
            className={`dashboard_project_table_body between ${
              (idx + 1) % 2 === 0 && "dashboard_project_table_body_bg"
            }`}
          >
            <div className="dashboard_project_table_body_item">{idx + 1}</div>
            <div className="dashboard_project_table_body_item">
              {row?.organization_name}
            </div>
            <div className="dashboard_project_table_body_item">{row?.organization_email}</div>
            <div className="dashboard_project_table_body_item">
              {row?.date_of_incorporation}
            </div>
            <div className="dashboard_project_table_body_item">
              {row?.industry_type}
            </div>
            <div
              className="dashboard_project_table_body_item"
              style={{ width: "30px", fontSize: "20px" }}
            >
              <img src={dots} alt="icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DashboardOrganisation;
