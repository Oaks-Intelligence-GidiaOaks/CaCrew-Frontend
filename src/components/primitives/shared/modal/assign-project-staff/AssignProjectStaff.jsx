import React, { useEffect, useRef, useState } from "react";
import "./AssignProjectStaff.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useAllProjectsQuery } from "services/project.service";
import { useAssignStaffProjectHandlerMutation } from "services/staff.service";
import rtkMutation from "utils/rtkMutation";
import { required } from "validations/validations";
import { formatErrorResponse } from "utils/formatErrorResponse";

const AssignProjectStaff = ({ data }) => {
  const [assignProjectHandler, { error, isError, isSuccess, isLoading }] =
    useAssignStaffProjectHandlerMutation();

  const { data: allProj } = useAllProjectsQuery();

  let projects = {};

  allProj?.forEach((item) => {
    const key = item?.project_name;
    const val = item?._id;
    projects[key] = val;
  });

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = async (value) => {
    value["staff_id"] = data?._id;
    // console.log(value, "vals");

    await rtkMutation(assignProjectHandler, value);
  };

  useEffect(() => {
    isSuccess &&
      dispatch(
        openModal({
          title: "Project Assigned Successfuly",
          message: `Project has successfuly been assigned to ${data?.name}`,
          success: true,
        })
      );

    isSuccess && dispatch(closeComponentModal());
    isError &&
      dispatch(
        openModal({
          title: "Project Assigning Failed",
          message: `${
            formatErrorResponse(error) ||
            "An error occured please try again later"
          }`,
        })
      );
  }, [isSuccess, isError, error, dispatch]);

//   console.log(projects, "s");

  return (
    <div className="assign_proj_modal">
      <div className="assign_proj_modal_title sub_heading">
        Assign a Project
      </div>
      <img
        src={close}
        alt="icon"
        className="assign_proj_modal_close"
        onClick={handleCloseModal}
      />
      <div className="assign_proj_modal_info_wrap ">
        <div className="assign_proj_modal_info_bold">
          Assign a Project to {data?.name}
        </div>
      </div>
      <div className="assign_proj_modal_input_warp">
        <div className="assign_proj_modal_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="assign_proj_modal_input_item"></div>
                <div className="assign_proj_modal_input_item">
                  <Field
                    name="project_id"
                    component={Input}
                    label={"Select Project"}
                    select
                    options={projects}
                    validate={required("Select Project")}
                  />
                </div>

                <div className="assign_proj_modal_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"assign_proj_modal_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Add"}
                    className={"assign_proj_modal_input_btn"}
                    type={"submit"}
                    loading={isLoading}
                    disabled={!valid}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignProjectStaff;
