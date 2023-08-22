import React from "react";
import "./OrgAdminDashboardHomeProject.scss";
import { square } from "assets/images";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAllProjectsQuery } from "services/project.service";
import { Shimmer, TrackProjectProgress } from "components";

const OrgAdminDashboardHomeProject = () => {
  const user = useSelector((state) => state.user.user);
  const { data } = useAllProjectsQuery();
  console.log(data, "test");

  return (
    <div className="org_dash_home_project">
      <div className="org_dash_home_project_heading">Projects</div>
      <div className="org_dash_home_project_wrap">
        <div className="org_dash_home_project_wrap_heading_wrap between">
          <div className="org_dash_home_project_wrap_heading">Title</div>
          <div className="org_dash_home_project_wrap_heading">Progress</div>
          <div className="org_dash_home_project_wrap_heading">View All</div>
        </div>
        {data && data?.length < 1 ? (
          <div className="org_dash_home_project_empty center col">
            <img src={square} alt="icon" />
            <Link
              to={user?.organization_id?.isVerified ? "/dashboard-project" : ""}
              className={`org_dash_home_project_empty_text ${
                !user?.organization_id?.isVerified &&
                "org_dash_home_project_empty_notallowed"
              }`}
            >
              Create a Project
            </Link>
          </div>
        ) : data?.length > 0 ? (
          <div>
            {data?.slice(0, 3)?.map((item) => (
              <div className="org_dash_home_project_wrap_heading_item start" key={item?._id}>
                <div className="org_dash_home_project_wrap_heading">{item?.project_name}</div>
                <div className="org_dash_home_project_wrap_heading">
                  <TrackProjectProgress phase={item?.progress}/>
                  Phase {item?.progress[item?.progress?.length - 1]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {Array(3).map(() => (
              <Shimmer height={"40px"} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgAdminDashboardHomeProject;
