import React from "react";
import "./DashboardOrganisation.scss";
import {
  useAllOrganisationQuery,
  // useVerifyOrganisationMutation,
} from "services/organisation.service";
import { formatErrorResponse } from "utils/formatErrorResponse";
import { useGetUserQuery } from "services/user.service";
import { TableAccordion } from "components";

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

  console.log(data, isLoading, "allOrg");

  return (
    <div className="dashboard_organisation">
      <div
        className="dashboard_organisation_wrap between"
        style={{ background: "#F2F5FF", padding: "20px" }}
      >
        <div className="dashboard_organisation_btn_wrap">
          <div className="dashboard_organisation_title">Organisations</div>
        </div>
        <div className="dashboard_organisation_organisation">
          <div className="dashboard_organisation_organisation_title">
            Organization
          </div>
          <div className="dashboard_organisation_organisation_name">
            {userData?.organization_id?.organization_name}
          </div>
        </div>
      </div>
      <div className="dashboard_organisation_review">
        <div className="dashboard_organisation_table">
          <div className="dashboard_organisation_table_head between">
            <div className="dashboard_organisation_table_head_item">Name of Company</div>
            <div className="dashboard_organisation_table_head_item">Company Email</div>
            <div className="dashboard_organisation_table_head_item">Industry</div>
            <div className="dashboard_organisation_table_head_item">Wallet</div>
            <div
              className="dashboard_organisation_table_head_item"
              style={{ width: "30px" }}
            ></div>
          </div>
          {data?.map((data) => (
            <TableAccordion data={data}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrganisation;
