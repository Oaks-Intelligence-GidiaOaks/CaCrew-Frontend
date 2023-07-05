import React from "react";
import "./DashboardProjectCreate.scss";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import Upload from "components/widgets/upload/Upload";
import Button from "components/widgets/button/Button";

const DashboardProjectCreate = () => {
  const onSubmit = (values) => {
    console.log(values);
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
                  name="project_id"
                  component={Input}
                  label={"Project ID"}
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="add_asignee"
                  component={Input}
                  label={"Add asignee"}
                  select
                  options={["Chinedu", "Uduak"]}
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="project_location"
                  component={Input}
                  label={"Project Location"}
                  select
                  options= {["Nigeria", "USA", "South Georgia", "France"]}
                />
              </div>
              <div className="dashboard_project_create_field">
                <Field
                  name="project_description"
                  component={Input}
                  label={"Project description"}
                  textArea
                />
              </div>
            </div>
            <div className="dashboard_project_create_upload_wrap">
              <Upload documentName={"document"} />
              <Button type={"submit"} text={"Create"} className={"dashboard_project_create_upload_btn"} />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default DashboardProjectCreate;
