import React, { useState } from "react";
import "./DashboardProject.scss";
import { Button, ProjectDetails } from "components";
import { DashboardProjectCreate, DashboardProjectReview } from "components";
import { useAllProjectsQuery } from "services/project.service";
import { useGetUserQuery } from "services/user.service";


const DashboardProject = () => {
  const [active, setActive] = useState("create");

  const handleTabSwitch = (value) => {
    setActive(value);
  };

  const {data, isSuccess, error} = useAllProjectsQuery()
  const {data: userData} = useGetUserQuery()

  const dataInComplete = data?.length > 0 ? data?.filter(item => item?.progress !== "Phase6") :  []
  const dataComplete = data?.length > 0 ? data?.filter(item => item?.progress === "Phase6") : []

  console.log(userData, "projtesr*******")

  const tabItems = {
    create: <DashboardProjectCreate />,
    review: <ProjectDetails data={dataInComplete}/>,
    complete: <ProjectDetails data={dataComplete}/>,
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
              {userData?.organization_id?.organization_name}
          </div>
        </div>
      </div>
      <div className="dash_pad">{tabItems}</div>
    </div>
  );
};

export default DashboardProject;
