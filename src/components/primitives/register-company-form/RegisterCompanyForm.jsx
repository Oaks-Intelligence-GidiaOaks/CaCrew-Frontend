import React from "react";
import { Form, Field } from "react-final-form";
import Input from "components/primitives/input/Input";
import Button from "components/widgets/Button/Button";
import { Link } from "react-router-dom";

const RegisterCompanyForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Let’s Get You Started</div>
            <div className="auth_form_sub_title">Tell us about your Organization</div>
            <div className="field">
              <Field
                name="organization_name"
                component={Input}
                label={"Name of Company"}
                tooltip="Name of Company"
              />
            </div>
            <div className="field">
              <Field
                name="organization_email"
                component={Input}
                label={"Company email"}
                tooltip="Email address"
              />
            </div>
            <Field name="company_website" component={Input} label={"Company's Website"} />
            <div className="field">
              <Field
                name="date_of_incorporation"
                component={Input}
                label={"Date of Incorporation"}
                date
              />
            </div>
            <div className="field">
              <Field
                name="industry_type"
                component={Input}
                label={"Select Industry"}
                tooltip="Select Industry"
              />
            </div>
            <Link to={"/register_admin"} className="auth_button_wrap">
              <Button type="submit" text={"Register"} />
            </Link>
          </form>
        )}
      />
    </div>
  );
};

export default RegisterCompanyForm;
