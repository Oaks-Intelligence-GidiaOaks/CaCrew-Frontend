import React from "react";
import "./TrackProjectTable.scss";
import { TrackProjectProgress } from "components";
import { Link } from "react-router-dom";

const TrackProjectTable = ({ data }) => {
  return (
    <div className="track_project_review">
      <div className="track_project_table">
        <div className="track_project_table_head between">
          <div className="track_project_table_head_item">Project ID</div>
          <div className="track_project_table_head_item">Name of Company</div>
          <div className="track_project_table_head_item">Project Title</div>
          <div className="track_project_table_head_item">Progress</div>
        </div>
        {data?.map((row, idx) => (
          <Link
            key={row?._id}
            className={`track_project_table_body between`}
            to={`/dashboard-track-project/overview/${row?._id}`}
          >
            <div className="track_project_table_body_item">{row?._id}</div>
            <div className="track_project_table_body_item">
              {row?.created_by?.organization_id?.organization_name}
            </div>
            <div className="track_project_table_body_item">
              {row?.project_name}
            </div>
            <div className="track_project_table_body_item">
              <TrackProjectProgress phase={row?.progress}/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrackProjectTable;
