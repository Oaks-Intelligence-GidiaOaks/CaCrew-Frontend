import React from "react";
import "./SuperAdminDashHome.scss";
import { CarbonCreditChart, SuperAdminStatCard, ChartFilter } from "components";
import { reg, trans, proj } from "assets/images";
import { useUnverifiedOrganisationQuery } from "services/organisation.service";
import { useAllProjectsQuery } from "services/project.service";

const SuperAdminDashHome = () => {
  const { data: unverifiedData } = useUnverifiedOrganisationQuery();
  const {data: projectData} = useAllProjectsQuery();
  return (
    <div className="sup_admin_dash_home">
      <div className="sup_admin_dash_home_card_wrap between">
        <div className="sup_admin_dash_home_card">
          <SuperAdminStatCard
            name={"Verify Organizations"}
            desc={"Pending Verifications, Organizations."}
            img={reg}
            link="/dashboard-organization"
            data={unverifiedData?.total}
          />
        </div>
        <div className="sup_admin_dash_home_card">
          <SuperAdminStatCard
            name={"Projects"}
            desc={"Available Created Projects"}
            img={proj}
            link="/dashboard-project"
            data={projectData?.length}
          />
        </div>
        <div className="sup_admin_dash_home_card">
          <SuperAdminStatCard
            name={"Transactions"}
            desc={"Total Transactions in last 24 hrs"}
            img={trans}
          />
        </div>
      </div>
      <div className="sup_admin_dash_home_chart_wrap">
        <ChartFilter title="Total Transaction Volume" />
        <div className="sup_admin_dash_home_chart">
          <div className="sup_admin_dash_home_chart_width">
            <CarbonCreditChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashHome;
