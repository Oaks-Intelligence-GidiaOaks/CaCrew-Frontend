import React, { useState } from "react";
import "./TrackProject.scss";
import { SearchInput, TrackProjectTable, TrackTableComplete } from "components";
import { useAllProjectsQuery } from "services/project.service";

const TrackProject = () => {
  const [activeTab, setActiveTab] = useState("new");

  const { data: projData, } = useAllProjectsQuery();

  const dataNew = projData?.filter((item) => item?.progress === "Phase1");
  const dataProgress = projData?.filter((item) => item?.progress !== "Phase1" && item?.progress !== "Phase6");
  const dataComplete = projData?.filter((item) => item?.progress === "Phase6");

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
      </div>

      {activeTab === "new" && <TrackProjectTable data={data} />}
      {activeTab === "ongoing" && <TrackProjectTable data={data} />}
      {activeTab === "complete" && <TrackTableComplete data={data} />}
    </div>
  );
};

export default TrackProject;
