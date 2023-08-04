import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useNavigate } from "react-router-dom";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import convertToDateFormat, {
  revertToDateFormat,
} from "utils/convertToDateFormat";
import validate, { required } from "validations/validations";
import { industries } from "static/industries";
import { formatOptionsList } from "utils/formatList";

const RegisterCompanyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [initialValuesCompany, setInitialValuesCompany] = useState({});

  const state = useSelector((state) => state.formdata);

  const onSubmit = (values) => {
    const { date_of_incorporation, ...otherValues } = values;
    const formatDate = convertToDateFormat(date_of_incorporation);
    dispatch(updateFormdata(otherValues));
    dispatch(updateFormdata({ date_of_incorporation: formatDate }));
    navigate("/register-admin");
    // console.log(formatDate, otherValues, "valuesDispatch");
  };
  // useEffect(() => {
  //   if (state && state.organization_name !== null) {
  //     const { date_of_incorporation } = state;
  //     const { ...copy } = state;
  //     copy["date_of_incorporation"] = revertToDateFormat(date_of_incorporation);
  //     setInitialValuesCompany(copy);
  //   }
  //   console.log(Object.keys(initialValuesCompany).length, "cop");
  //   console.log(initialValuesCompany, "cop2");
  // }, [state]);

  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        // initialValues={initialValuesCompany}
        render={({ handleSubmit, valid }) => (
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
                validate={required("Organisation name")}
              />
            </div>
            <div className="field">
              <Field
                name="organization_email"
                component={Input}
                label={"Company email"}
                tooltip="Email address for your organization"
                validate={required("Organisation email")}
              />
            </div>
            <Field
              name="company_website"
              component={Input}
              label={"Company's Website"}
              required={false}
            />
            <div className="field">
              <Field
                name="date_of_incorporation"
                component={Input}
                label={"Date of Incorporation"}
                date
                validate={required("Date of Incorporation")}
              />
            </div>
            <div className="field">
              <Field
                name="industry_type"
                component={Input}
                label={"Select Industry"}
                tooltip="Select the Industry your organization belongs to"
                select
                selectDefault={"Select an Industry"}
                options={formatOptionsList(industries)}
                validate={required("Industry type")}
              />
            </div>
            <Button type="submit" text={"Register"} disabled={!valid} />
          </form>
        )}
      />
    </div>
  );
};

export default RegisterCompanyForm;
