import React from "react";
import "./TrackTableComplete.scss";
import { Link } from "react-router-dom";

const TrackTableComplete = ({ data, link }) => {
  return (
    <div className="track_complete">
      <div className="track_table">
        <div className="track_table_head between">
          <div className="track_table_head_item">Application ID</div>
          <div className="track_table_head_item">Name of Company</div>
          <div className="track_table_head_item">Project Title</div>
          <div className="track_table_head_item">Crediting Amount</div>
          <div className="track_table_head_item">Offset Period</div>
        </div>
        {data?.map((row, idx) => (
          <Link
            key={row?._id}
            className={`track_table_body between`}
            to={`${link}${row?._id}`}
          >
            <div className="track_table_body_item">{row?._id}</div>
            <div className="track_table_body_item">
              {row?.created_by?.organization_id?.organization_name}
            </div>
            <div className="track_table_body_item"> {row?.project_name}</div>
            <div className="track_table_body_item">{row?.amount_earned}</div>
            <div className="track_table_body_item">
              12 Jan 2021 - 12 Jan 2023
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrackTableComplete;
