import React from "react";
import "./ProjectPreview.scss";
import { square } from "assets/images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAllProjectsQuery, useGetHandledProjectsQuery } from "services/project.service";
import { Shimmer, TrackProjectProgress } from "components";

const ProjectPreview = () => {
  const user = useSelector((state) => state.user.user);
  const { data: allProj } = useAllProjectsQuery();
  const { data: handledProj } = useGetHandledProjectsQuery();
  const data = user?.isAdminStaff ? handledProj : allProj
  console.log(data, "test");

  return (
    <div className="org_dash_home_project">
      <div className="org_dash_home_project_heading">Projects</div>
      <div className="org_dash_home_project_wrap">
        <div className="org_dash_home_project_wrap_heading_wrap between">
          <div className="org_dash_home_project_wrap_heading">Title</div>
          <div className="org_dash_home_project_wrap_heading">Progress</div>
          <Link
            to={user?.organization_id?.isVerified ? "/dashboard-project" : ""}
            className="org_dash_home_project_wrap_heading link"
          >
            View All
          </Link>
        </div>
        {data && data?.length < 1 ? (
          <div className="org_dash_home_project_empty center col">
            {user?.role === "OrgAdmin" && <img src={square} alt="icon" />}
            <Link
              to={user?.organization_id?.isVerified ? "/dashboard-project" : ""}
              className={`org_dash_home_project_empty_text ${
                !user?.organization_id?.isVerified &&
                "org_dash_home_project_empty_notallowed"
              }`}
            >
              {user?.role === "Staff"
                ? "No projects assigned"
                : "Create a Project"}
            </Link>
          </div>
        ) : data?.length > 0 ? (
          <div>
            {data?.slice(0, 2)?.map((item) => (
              <div
                className="org_dash_home_project_wrap_heading_item start"
                key={item?._id}
              >
                <div className="org_dash_home_project_wrap_heading">
                  {item?.project_name}
                </div>
                <div className="org_dash_home_project_wrap_heading">
                  <TrackProjectProgress phase={item?.progress} />
                  Phase {item?.progress[item?.progress?.length - 1]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "17px" }}>
            {Array(3)
              .fill(1)
              .map((_, idx) => (
                <div key={idx} className="mb_10 mt_10">
                  <Shimmer height={"20px"} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
