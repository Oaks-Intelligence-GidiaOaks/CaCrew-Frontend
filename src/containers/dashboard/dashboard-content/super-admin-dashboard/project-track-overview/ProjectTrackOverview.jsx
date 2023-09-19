import React, { useEffect, useState } from "react";
import "./ProjectTrackOverview.scss";
import {
  Button,
  CustomProjectSelect,
  Input,
  ProjectDetailAccordion,
  TrackProjectProgress,
} from "components";
// import { certificate } from "assets/images";
import { Form, Field } from "react-final-form";
import { useParams } from "react-router-dom";
import {
  useAllProjectsQuery,
  useCloseProjectMutation,
  useUpdateProjectMutation,
} from "services/project.service";
import { useDispatch } from "react-redux";
import { openModal } from "redux/slices/modal.slice";
import { useSendOtpMutation } from "services/transaction.service";
import { required } from "validations/validations";
import rtkMutation from "utils/rtkMutation";
import { certificate } from "assets/images";
import { formatOptionsList } from "utils/formatList";
import { countries } from "static/countries";
import { formatErrorResponse } from "utils/formatErrorResponse";

const ProjectTrackOverview = () => {
  const [amount, setAmount] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(amount, "id");

  const { data, error, isSuccess, isLoading } = useAllProjectsQuery();
  const [sendOtp, { data: otpData }] = useSendOtpMutation({
    skip: !isButtonClicked,
  });
  const [
    updateProject,
    {
      isLoading: loadingValidateDate,
      isError: isErrorValidate,
      isSuccess: isSuccessValidate,
      error: errorValidate,
    },
  ] = useUpdateProjectMutation();
  const [
    closeProject,
    {
      isLoading: isLoadingClosed,
      isSuccess: isSuccessClosed,
      isError: isErrorClosed,
      error: errorClosed,
    },
  ] = useCloseProjectMutation();

  const projectData = data?.filter((item) => item?._id === id)[0];

  const onSubmit = (value) => {
    const id = projectData?.created_by?.organization_id?._id;
    const project_id = projectData?._id;
    const newObj = {};
    // newObj.amount = value.amount;
    // newObj.certificate_number = value.certificate_number;
    setAmount(value.amount);
    newObj.organization_id = id;
    newObj.project_id = project_id;
    Object.assign(newObj, value);

    // refetch()
    rtkMutation(sendOtp, null);
    dispatch(
      openModal({
        component: "VerifyOtp",
        data: {
          value: newObj,
          name: projectData?.created_by?.organization_id?.organization_name,
        },
      })
    );
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 2000);
    // console.log(value, "val");
  };

  const submitValidationDates = (values) => {
    values['project_name'] = projectData?.project_name
    rtkMutation(updateProject, { id, body: values });
    // console.log(values);
  };

  // console.log(isButtonClicked, "value");

  // console.log(projectData, error, isSuccess, isLoading, "oneProj");
  useEffect(() => {
    isSuccessClosed &&
      dispatch(
        openModal({
          title: "Project Closed Succesfully",
          message: `The project with id: ${id} is closed succesfully`,
          success: true,
        })
      );
    isErrorClosed &&
      dispatch(
        openModal({
          title: "Project Closed Failed",
          message:
            formatErrorResponse(errorClosed) ||
            "An error ocurred, please try again",
        })
      );
    isSuccessValidate &&
      dispatch(
        openModal({
          title: "Project Validation Period",
          message: `The project with id: ${id} has been updated succesfully`,
          success: true,
        })
      );
    isErrorValidate &&
      dispatch(
        openModal({
          title: "Project Validation Period",
          message:
            formatErrorResponse(errorValidate) ||
            "An error ocurred, please try again",
        })
      );
  });

  return (
    <div className="proj_track_overview dash_pad">
      <div className="proj_track_overview_wrap">
        <div className="proj_track_overview_title sub_heading">
          Project Overview
        </div>
        <div className="between proj_track_overview_info_wrap_con">
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
                <div
                  className="proj_track_overview_info_wrap_item_value"
                  style={{ marginTop: "14px" }}
                >
                  <Button
                    text={"Close Project"}
                    loading={isLoadingClosed}
                    onClick={() => {
                      rtkMutation(closeProject, id);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="proj_track_overview_acc_wrap">
              <ProjectDetailAccordion data={projectData} />
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
          <CustomProjectSelect
            data={projectData}
            amount={amount}
            // isSuccessCredit={isSuccessCredit}
          />
          <div className="validation_proj_select_title">
            Update Project Validation{" "}
          </div>
          <Form
            onSubmit={submitValidationDates}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="validation_start_date"
                  label="Validation Start Date"
                  date
                  component={Input}
                  placeholder="Validation Start Date"
                  validate={required("Validation Start Date")}
                />
                <Field
                  name="validation_end_date"
                  label="Validation End Date"
                  date
                  component={Input}
                  placeholder="Enter Validation End Date"
                  validate={required("Validation End Date")}
                />

                <Button
                  type={"submit"}
                  text={"Submit"}
                  disabled={!valid}
                  loading={loadingValidateDate}
                />
              </form>
            )}
          />
        </div>
        <div className="proj_track_overview_update_credit">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
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
                  validate={required("Amount")}
                />
                <Field
                  name="certificate_number"
                  label="Certificate Number"
                  component={Input}
                  disabled={projectData?.progress === "Phase6" ? false : true}
                  placeholder="Enter certificate numer"
                  validate={required("Certificate Number")}
                />
                <Field
                  name="registry"
                  label="Registry"
                  component={Input}
                  disabled={projectData?.progress === "Phase6" ? false : true}
                  placeholder="Enter name of registry"
                  validate={required("Registry")}
                />
                <Field
                  name="country"
                  component={Input}
                  label={"Country"}
                  select
                  options={formatOptionsList(countries)}
                  validate={required("Country")}
                />
                <Button
                  type={"submit"}
                  text={"Submit"}
                  disabled={!valid}
                  onClick={() => {
                    setIsButtonClicked(true);
                  }}
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTrackOverview;
