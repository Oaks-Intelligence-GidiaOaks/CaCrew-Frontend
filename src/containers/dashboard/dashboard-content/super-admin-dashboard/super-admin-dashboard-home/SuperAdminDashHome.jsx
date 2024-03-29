import React, { useState } from "react";
import "./SuperAdminDashHome.scss";
import { CarbonCreditChart, SuperAdminStatCard, ChartFilter } from "components";
import { reg, trans, proj } from "assets/images";
import { useUnverifiedOrganisationQuery } from "services/organisation.service";
import { useAllProjectsQuery } from "services/project.service";
import { useAllTransactionsQuery } from "services/transaction.service";

const SuperAdminDashHome = () => {
  // set state to manage chart filter buttons
  const [filter, setFilter] = useState({
    bought: true,
    sold: true,
    retired: true,
  });

  // Func finds and update target filter parameter
  const handleToggleFilter = (target) => {
    target && setFilter((prev) => ({ ...prev, [target]: prev[target] === true ? false : true }));
  };
  const { data: unverifiedData } = useUnverifiedOrganisationQuery({});
  const { data: projectData } = useAllProjectsQuery();
  const { data: transactionData } = useAllTransactionsQuery({});
  // console.log(transactionData, "trans");
  return (
    <div className="sup_admin_dash_home dash_pad">
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
            link="/dashboard-wallet"
            data={transactionData?.totalTransactions || transactionData?.length}
          />
        </div>
      </div>
      <div className="sup_admin_dash_home_chart_wrap">
        <ChartFilter title="Total Transaction Volume" handleToggleFilter={handleToggleFilter}/>
        <div className="sup_admin_dash_home_chart">
          <div className="sup_admin_dash_home_chart_width">
            <CarbonCreditChart filter={filter}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashHome;
