import React, { useState } from "react";
import "./DashboardProject.scss";
import { Button, ProjectDetails } from "components";
// import { DashboardProjectCreate, DashboardProjectReview } from "components";
import {
  useAllProjectsQuery,
  useGetHandledProjectsQuery,
} from "services/project.service";
import { useGetUserQuery } from "services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "redux/slices/modal.slice";

const DashboardProject = () => {
  const [active, setActive] = useState("review");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleTabSwitch = (value) => {
    setActive(value);
  };
  const handleOpenCreateProjModal = (value) => {
    dispatch(openModal({ component: "StartProjectModal" }));
  };

  const { data, isSuccess, error } = useAllProjectsQuery();
  const { data: handledProj } = useGetHandledProjectsQuery();
  const { data: userData } = useGetUserQuery();

  const dataInComplete =
    data?.length > 0
      ? data?.filter((item) => item?.progress !== "Phase6")
      : user?.isAdminStaff && handledProj
      ? handledProj?.filter((item) => item?.progress !== "Phase6")
      : [];
  const dataComplete =
    data?.length > 0
      ? data?.filter((item) => item?.progress === "Phase6")
      : user?.isAdminStaff && handledProj
      ? handledProj?.filter((item) => item?.progress !== "Phase6")
      : [];

  console.log(data, "projtesr*******");

  const tabItems = {
    // create: <DashboardProjectCreate />,
    review: <ProjectDetails data={dataInComplete} />,
    complete: <ProjectDetails data={dataComplete} />,
  }[active];

  return (
    <div className="dashboard_project">
      <div className="dashboard_project_wrap between">
        <div className="dashboard_project_btn_wrap">
          <div className="dashboard_project_title">Projects</div>
          <div className="dashboard_project_btns start">
            {(user?.role === "SuperAdmin" || user?.role === "OrgAdmin") && (
              <Button
                text={"Create Project"}
                className={`dashboard_project_btn ${
                  active === "create" && "dashboard_project_btn_active"
                }`}
                onClick={handleOpenCreateProjModal}
              />
            )}
            <Button
              text={"Project in Review " + `(${dataInComplete?.length})`}
              className={`dashboard_project_btn ${
                active === "review" && "dashboard_project_btn_active"
              }`}
              onClick={() => handleTabSwitch("review")}
            />
            <Button
              text={"Project Completed " + `(${dataComplete?.length})`}
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
