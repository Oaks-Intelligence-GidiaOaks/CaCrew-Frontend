import React from "react";
import "./ProjectTrackOverview.scss";
import { Button, TrackProjectProgress } from "components";
import { certificate } from "assets/images";

const ProjectTrackOverview = () => {
  return (
    <div className="proj_track_overview dash_pad between">
      <div className="proj_track_overview_wrap">
        <div className="proj_track_overview_title sub_heading">
          Project Overview
        </div>
        <div className="proj_track_overview_info_wrap">
          <div className="proj_track_overview_info_wrap_items start">
            <div className="proj_track_overview_info_wrap_item">
              <div className="proj_track_overview_info_wrap_item_text">
                Project ID
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                PGS-0002
              </div>
            </div>
            <div className="proj_track_overview_info_wrap_item">
              <div className="proj_track_overview_info_wrap_item_text">
                Name of Company
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                The Fisher Organization
              </div>
            </div>
            <div className="proj_track_overview_info_wrap_item">
              <div className="proj_track_overview_info_wrap_item_text">
                Project Title
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                One Hundred Million Trees
              </div>
            </div>
            <div className="proj_track_overview_info_wrap_item">
              <div className="proj_track_overview_info_wrap_item_text">
                Name of Originator
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                George Baskerville
              </div>
            </div>
            <div className="proj_track_overview_info_wrap_item">
              <div className="proj_track_overview_info_wrap_item_text">
                Users Assigned to Project
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                James
              </div>
            </div>
            <div className="proj_track_overview_info_wrap_item" style={{marginBottom: "-32px"}}>
              <div className="proj_track_overview_info_wrap_item_text">
                Current Progress:
              </div>
              <div className="proj_track_overview_info_wrap_item_value">
                Phase 1 : Verification
              </div>
              <div className="proj_track_overview_info_wrap_item_value" style={{marginTop: "14px"}}>
                <TrackProjectProgress />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="proj_track_overview_cert">
        <div className="proj_track_overview_cert_title sub_heading">Carbon Credit Certificate</div>
        <img src={certificate} alt="" className="proj_track_overview_cert_img"/>
        <Button text={"View Certificate"} className={"proj_track_overview_btn"}/>
      </div>
    </div>
  );
};

export default ProjectTrackOverview;
