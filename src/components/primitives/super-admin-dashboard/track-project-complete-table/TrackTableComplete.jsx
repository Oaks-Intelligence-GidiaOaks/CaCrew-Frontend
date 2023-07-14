import React from "react";
import "./TrackTableComplete.scss";

const TrackTableComplete = ({ data }) => {
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
          <div key={row?._id} className={`track_table_body between`}>
            <div className="track_table_body_item">{row?._id}</div>
            <div className="track_table_body_item">
              {row?.created_by?.organization_id?.organization_name}
            </div>
            <div className="track_table_body_item"> {row?.description}</div>
            <div className="track_table_body_item">{row?.amount_earned}</div>
            <div className="track_table_body_item">
              12 Jan 2021 - 12 Jan 2023
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackTableComplete;
