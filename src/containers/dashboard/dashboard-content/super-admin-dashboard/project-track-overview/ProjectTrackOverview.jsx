import React, { useEffect, useState } from "react";
import "./ProjectTrackOverview.scss";
import {
  Button,
  CustomProjectSelect,
  Input,
  TrackProjectProgress,
} from "components";
import { certificate } from "assets/images";
import { Form, Field } from "react-final-form";
import { useParams } from "react-router-dom";
import { useAllProjectsQuery } from "services/project.service";
import { useSendCreditMutation } from "services/user.service";
import rtkMutation from "utils/rtkMutation";

const ProjectTrackOverview = () => {
  const [sendCredit, { data: dataRes, isSuccess: isSuccessCredit, isLoading: loading }] =
    useSendCreditMutation();

  const [amount, setAmount] = useState(0);

  const { id } = useParams();

  // console.log(id,  "id")

  const { data, error, isSuccess, isLoading } = useAllProjectsQuery();

  const projectData = data?.filter((item) => item?._id === id)[0];

  const onSubmit = (value) => {
    value["organization_id"] = projectData?.created_by?.organization_id?._id;
    rtkMutation(sendCredit, value);
    setAmount(value.amount);
    console.log(value, "val");
  };

  console.log(amount, "value");

  // useEffect(() => {}, [amount]);

  // console.log(projectData, error, isSuccess, isLoading, "oneProj");

  return (
    <div className="proj_track_overview dash_pad">
      <div className="proj_track_overview_wrap">
        <div className="proj_track_overview_title sub_heading">
          Project Overview
        </div>
        <div className="between">
          <div className="proj_track_overview_info_wrap">
            <div className="proj_track_overview_info_wrap_items start">
              <div className="proj_track_overview_info_wrap_item">
                <div className="proj_track_overview_info_wrap_item_text">
                  Project ID
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  {projectData?._id}
                </div>
              </div>
              <div className="proj_track_overview_info_wrap_item">
                <div className="proj_track_overview_info_wrap_item_text">
                  Name of Company
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  {projectData?.created_by?.organization_id?.organization_name}
                </div>
              </div>
              <div className="proj_track_overview_info_wrap_item">
                <div className="proj_track_overview_info_wrap_item_text">
                  Project Title
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  {projectData?.project_name || "--------"}
                </div>
              </div>
              <div className="proj_track_overview_info_wrap_item">
                <div className="proj_track_overview_info_wrap_item_text">
                  Name of Originator
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  {projectData?.originator?.name}
                </div>
              </div>
              <div className="proj_track_overview_info_wrap_item">
                <div className="proj_track_overview_info_wrap_item_text">
                  Users Assigned to Project
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  {projectData?.created_by?.name}
                </div>
              </div>
              <div
                className="proj_track_overview_info_wrap_item"
                style={{ marginBottom: "-32px" }}
              >
                <div className="proj_track_overview_info_wrap_item_text">
                  Current Progress:
                </div>
                <div className="proj_track_overview_info_wrap_item_value">
                  <span>{projectData?.progress?.match("Phase")[0]}</span>{" "}
                  <span>{projectData?.progress?.split("Phase")[1]}</span>
                </div>
                <div
                  className="proj_track_overview_info_wrap_item_value"
                  style={{ marginTop: "14px" }}
                >
                  <TrackProjectProgress phase={projectData?.progress} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="proj_track_overview_cert">
            <div className="proj_track_overview_cert_title sub_heading">
              Carbon Credit Certificate
            </div>
            <img
              src={certificate}
              alt=""
              className="proj_track_overview_cert_img"
            />
            <Button
              text={"View Certificate"}
              className={"proj_track_overview_btn"}
            />
          </div> */}
        </div>
      </div>
      <div className="proj_track_overview_update_wrap between">
        <div className="proj_track_overview_update_value">
          <CustomProjectSelect data={projectData} amount={amount} isSuccessCredit={isSuccessCredit}/>
        </div>
        <div className="proj_track_overview_update_credit">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  opacity: projectData?.progress === "Phase6" ? 1 : 0.4,
                }}
              >
                <Field
                  name="amount"
                  label="Carbon Credit Allocated to Project"
                  component={Input}
                  disabled={projectData?.progress === "Phase6" ? false : true}
                  placeholder="Allocate carbon credit"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button type={"submit"} text={"Submit"} loading={loading} />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTrackOverview;
