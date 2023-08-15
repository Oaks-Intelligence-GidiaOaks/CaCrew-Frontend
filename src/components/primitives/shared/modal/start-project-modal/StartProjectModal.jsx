import React, { useEffect, useRef, useState } from "react";
import "./StartProjectModal.scss";
import { close } from "assets/images";
import { useDispatch } from "react-redux";
import { closeComponentModal, openModal } from "redux/slices/modal.slice";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useAddProjectMutation } from "services/project.service";
import { useAllStaffsQuery } from "services/staff.service";
import rtkMutation from "utils/rtkMutation";
import { Upload } from "components";
import { countries } from "static/countries";
import { formatOptionsList } from "utils/formatList";
import { required } from "validations/validations";
import fileTypeReader from "utils/fileTypeReader";
import { formatErrorResponse } from "utils/formatErrorResponse";

const StartProjectModal = () => {
  const [addProject, { error, isError, isSuccess, isLoading }] =
    useAddProjectMutation();

  const { data } = useAllStaffsQuery();

  let staffs = {};

  data?.forEach((item) => {
    const key = item?.name;
    const val = item?._id;
    staffs[key] = val;
  });

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeComponentModal());
  };

  const onSubmit = (values) => {
    const file = values.document;
    if (file) {
      const reader = new FileReader();
      let object = {};
      fileTypeReader(file, reader);
      // let uploadObj = {}
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = file.name;
        object.type = file.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(file);
        // Replace form value with object
        // uploadObj["document"] = object;
        values["document"] = object;
        rtkMutation(addProject, values);
      };
      console.log(values.document, "val");
    }
  };

  useEffect(() => {
    isSuccess &&
      dispatch(
        openModal({
          title: "Project Created Successfuly",
          message: "Project has successfuly been updated",
          success: true,
        })
      );

    isSuccess && dispatch(closeComponentModal());
    isError &&
      dispatch(
        openModal({
          title: "Project Creation Failed",
          message: `${
            formatErrorResponse(error) ||
            "An error occured please try again later"
          }`,
        })
      );
  }, [isSuccess, isError, error, dispatch]);

  return (
    <div className="start_proj_modal">
      <div className="start_proj_modal_title sub_heading">Start a Project</div>
      <img
        src={close}
        alt="icon"
        className="start_proj_modal_close"
        onClick={handleCloseModal}
      />
      <div className="start_proj_modal_info_wrap ">
        <div className="start_proj_modal_info_bold">
          Create a New Project to Generate Carbon Credit
        </div>
      </div>
      <div className="start_proj_modal_input_warp">
        <div className="start_proj_modal_input">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, valid }) => (
              <form onSubmit={handleSubmit}>
                <div className="start_proj_modal_input_item">
                  <Field
                    name="project_name"
                    component={Input}
                    label={"Project name"}
                    placeholder="Add project name"
                  />
                  {/* <div className="start_proj_modal_input_item_fee">
                    Transaction Fee: 0.0 tco2e
                  </div> */}
                </div>
                <div className="start_proj_modal_input_item">
                  <Field
                    name="originator"
                    component={Input}
                    label={"Add asignee"}
                    select
                    options={staffs}
                    validate={required("Add asignee")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="location"
                    component={Input}
                    label={"Project Location"}
                    select
                    options={formatOptionsList(countries)}
                    validate={required("Project Location")}
                  />
                </div>
                <div className=" ">
                  <Field
                    name="description"
                    component={Input}
                    label={"Project description"}
                    textArea
                    validate={required("Project description")}
                  />
                </div>
                <div className=" ">
                  <Upload documentName={"document"} />
                </div>
                <div className="start_proj_modal_input_btn_wrap end">
                  <Button
                    text={"Cancel"}
                    className={"start_proj_modal_input_btn_two"}
                    onClick={handleCloseModal}
                  />
                  <Button
                    text={"Create"}
                    className={"start_proj_modal_input_btn"}
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

export default StartProjectModal;
