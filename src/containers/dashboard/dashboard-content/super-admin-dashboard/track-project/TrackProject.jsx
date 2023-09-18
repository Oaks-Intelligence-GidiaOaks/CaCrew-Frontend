import React, { useState } from "react";
import "./TrackProject.scss";
import { SearchInput, TrackProjectTable, TrackTableComplete } from "components";
import {
  useAllProjectsQuery,
  useGetHandledProjectsQuery,
  useAllClosedProjectsQuery,
} from "services/project.service";
import { useSelector } from "react-redux";

const TrackProject = () => {
  const [activeTab, setActiveTab] = useState("new");

  const user = useSelector((state) => state.user.user);

  const { data: projData } = useAllProjectsQuery();
  const { data: handledProj } = useGetHandledProjectsQuery();
  const { data: closedProj } = useAllClosedProjectsQuery();

  const dataNew = user?.isAdminStaff
    ? handledProj?.filter((item) => item?.progress === "Phase1")
    : projData?.filter((item) => item?.progress === "Phase1");
  const dataProgress = user?.isAdminStaff
    ? handledProj?.filter(
        (item) => item?.progress !== "Phase1" && item?.progress !== "Phase6"
      )
    : projData?.filter(
        (item) => item?.progress !== "Phase1" && item?.progress !== "Phase6"
      );
  const dataComplete = user?.isAdminStaff
    ? handledProj?.filter((item) => item?.progress === "Phase6")
    : projData?.filter((item) => item?.progress === "Phase6");

  const data =
    activeTab === "new"
      ? dataNew
      : activeTab === "ongoing"
      ? dataProgress
      : dataComplete;

  console.log(dataProgress, "track");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="track_project dash_pad">
      <div className="track_project_wrap between">
        <div className="track_project_btn_wrap">
          <div className="track_project_title">Projects</div>
        </div>
        <div className="track_project_search">
          <SearchInput />
        </div>
      </div>
      <div className="track_project_tab between">
        <div
          className={`track_project_tab_item ${
            activeTab === "new" && "track_project_tab_item_active"
          }`}
          onClick={() => handleTabClick("new")}
        >
          New Projects
        </div>
        <div
          className={`track_project_tab_item ${
            activeTab === "ongoing" && "track_project_tab_item_active"
          }`}
          onClick={() => handleTabClick("ongoing")}
        >
          Ongoing Projects
        </div>
        <div
          className={`track_project_tab_item ${
            activeTab === "complete" && "track_project_tab_item_active"
          }`}
          onClick={() => handleTabClick("complete")}
        >
          Completed Projects
        </div>
        <div
          className={`track_project_tab_item ${
            activeTab === "close" && "track_project_tab_item_active"
          }`}
          onClick={() => handleTabClick("close")}
        >
          Closed Projects
        </div>
      </div>

      {activeTab === "new" && <TrackProjectTable data={data} />}
      {activeTab === "ongoing" && <TrackProjectTable data={data} />}
      {activeTab === "complete" && <TrackTableComplete data={data} link={"/dashboard-track-project/overview/"}/>}
      {activeTab === "close" && <TrackTableComplete data={closedProj} link={"/dashboard-track-project/closed/"}/>}
    </div>
  );
};

export default TrackProject;
