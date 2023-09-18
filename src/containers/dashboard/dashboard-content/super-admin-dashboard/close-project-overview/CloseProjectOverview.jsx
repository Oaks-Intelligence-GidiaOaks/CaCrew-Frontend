import React from "react";
import "./CloseProjectOverview.scss";
import { Link, useParams } from "react-router-dom";
import { useClosedProjectDetailQuery } from "services/project.service";
import { Button, Shimmer } from "components";

const CloseProjectOverview = () => {
  const id = useParams();
  const { data } = useClosedProjectDetailQuery(id.id);
  console.log(data, "*id");
  return (
    <div className="track_complete dash_pad">
      <Link
        to={"http://localhost:3000/dashboard-track-project"}
        className="link"
      >
        <Button
          text={"Back"}
          style={{ width: "200px", marginBottom: "20px" }}
        />
      </Link>
      <div className="track_table">
        <div className="track_table_head between">
          <div className="track_table_head_item">Application ID</div>
          <div className="track_table_head_item">Certificate Number</div>
          <div className="track_table_head_item">Registry</div>
          <div className="track_table_head_item">Crediting Amount</div>
          <div className="track_table_head_item">Country</div>
        </div>
        {data
          ? data?.map((row, idx) => (
              <div
                key={row?._id}
                className={`track_table_body between`}
                // to={`/dashboard-track-project/overview/${row?._id}`}
              >
                <div className="track_table_body_item">{row?._id}</div>
                <div className="track_table_body_item">
                  {row?.certificate_number}
                </div>
                <div className="track_table_body_item"> {row?.registry}</div>
                <div className="track_table_body_item">{row?.amount}</div>
                <div className="track_table_body_item">{row?.country}</div>
              </div>
            ))
          : Array(8)
              .fill(1)
              .map(() => <div className="mt_10"><Shimmer height={"35px"} /></div>)}
      </div>
    </div>
  );
};

export default CloseProjectOverview;
