import React from "react";
import "./DashboardProjectCreate.scss";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import Upload from "components/widgets/upload/Upload";
import Button from "components/widgets/button/Button";
import { useAddProjectMutation } from "services/project.service";
import rtkMutation from "utils/rtkMutation";
import fileTypeReader from "utils/fileTypeReader";
import { useAllStaffsQuery } from "services/staff.service";

const DashboardProjectCreate = () => {
  const [addProject, { error, isSuccess, isLoading }] = useAddProjectMutation();

  const { data } = useAllStaffsQuery();

  let staffs = {};

  data?.forEach((item) => {
    const key = item?.name;
    const val = item?._id;
    staffs[key] = val;
  });

  const onSubmit = (values) => {
    const file = values.document;
    if (file) {
      const reader = new FileReader();
      let object = {};
      reader.onload = () => {
        // Get string result from file
        const fileDataString = reader.result;
        // Add to properties
        object.name = file.name;
        object.type = file.type;
        object.string = fileDataString; // store the string result
        object.path = URL.createObjectURL(file);
        // Replace form value with object
        values["document"] = object;
        rtkMutation(addProject, values);
      };
      fileTypeReader(file, reader);
      console.log(values.document, "val");
    }
  };
  return (
    <div className="dashboard_project_create">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="dashboard_project_create_input_wrap between"
          >
            <div className="dashboard_project_create_input_wrap">
              <div className="dashboard_project_create_field">
                <Field
                  name="project_name"
                  component={Input}
                  label={"Project name"}
                  placeholder="Add project name"
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="originator"
                  component={Input}
                  label={"Add asignee"}
                  select
                  options={staffs}
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="location"
                  component={Input}
                  label={"Project Location"}
                  select
                  options={{ Nigeria: "Nigeria", USA: "USA", UK: "UK" }}
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="description"
                  component={Input}
                  label={"Project description"}
                  textArea
                />
              </div>
            </div>
            <div className="dashboard_project_create_upload_wrap">
              <Upload documentName={"document"} />
              <div>{isSuccess && "Successful"}</div>
              <Button
                type={"submit"}
                text={"Create"}
                className={"dashboard_project_create_upload_btn"}
                loading={isLoading}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default DashboardProjectCreate;
