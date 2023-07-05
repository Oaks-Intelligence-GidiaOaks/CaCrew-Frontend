import React from "react";
import { Form, Field } from "react-final-form";
import Input from "components/widgets/input/Input";
import Button from "components/widgets/button/Button";
import { useNavigate } from "react-router-dom";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import convertToDateFormat from "utils/convertToDateFormat";

const RegisterCompanyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const state = useSelector((state) => state.formdata);

  const onSubmit = (values) => {
    const { date_of_incorporation, ...otherValues } = values;
    const formatDate = convertToDateFormat(date_of_incorporation)
    dispatch(updateFormdata(otherValues));
    dispatch(updateFormdata({date_of_incorporation: formatDate}));
    navigate("/register_admin");
    console.log(formatDate, otherValues, "valuesDispatch");
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="auth_form_title">Let’s Get You Started</div>
            <div className="auth_form_sub_title">
              Tell us about your Organization
            </div>
            <div className="field">
              <Field
                name="organization_name"
                component={Input}
                label={"Name of Company"}
                tooltip="Name of Company, Please input your organization name"
              />
            </div>
            <div className="field">
              <Field
                name="organization_email"
                component={Input}
                label={"Company email"}
                tooltip="Email address for your organization"
              />
            </div>
            <Field
              name="company_website"
              component={Input}
              label={"Company's Website"}
            />
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
                tooltip="Select the Industry your organization belongs to"
              />
            </div>
            <Button type="submit" text={"Register"} />
          </form>
        )}
      />
    </div>
  );
};

export default RegisterCompanyForm;
