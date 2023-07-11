import React, { useState } from "react";
import "./DashboardProject.scss";
import Button from "components/widgets/button/Button";
import { DashboardProjectCreate, DashboardProjectReview } from "components";
import { useAllProjectsQuery } from "services/project.service";


const DashboardProject = () => {
  const [active, setActive] = useState("create");

  const handleTabSwitch = (value) => {
    setActive(value);
  };

  const {data, isSuccess, errpr} = useAllProjectsQuery()


  const tabItems = {
    create: <DashboardProjectCreate />,
    review: <DashboardProjectReview data={data}/>,
    complete: <DashboardProjectReview />,
  }[active];

  return (
    <div className="dashboard_project">
      <div className="dashboard_project_wrap between">
        <div className="dashboard_project_btn_wrap">
          <div className="dashboard_project_title">Projects</div>
          <div className="dashboard_project_btns start">
            <Button
              text={"Create Project"}
              className={`dashboard_project_btn ${
                active === "create" && "dashboard_project_btn_active"
              }`}
              onClick={() => handleTabSwitch("create")}
            />
            <Button
              text={"Project in Review"}
              className={`dashboard_project_btn ${
                active === "review" && "dashboard_project_btn_active"
              }`}
              onClick={() => handleTabSwitch("review")}
            />
            <Button
              text={"Project Completed"}
              className={`dashboard_project_btn ${
                active === "complete" && "dashboard_project_btn_active"
              }`}
              onClick={() => handleTabSwitch("complete")}
            />
          </div>
        </div>
        <div className="dashboard_project_organisation">
          <div className="dashboard_project_organisation_title">
            Organization
          </div>
          <div className="dashboard_project_organisation_name">
            Oaks Intelligence Limited
          </div>
        </div>
      </div>
      <div className="dash_pad">{tabItems}</div>
    </div>
  );
};

export default DashboardProject;
