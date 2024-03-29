import React from "react";
import { updateFormdata } from "redux/slices/register.slice";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button, Input } from "components";
import { useNavigate } from "react-router-dom";
import validate, {
  required,
  passwordMatch,
  composeValidators,
} from "validations/validations";

const RegisterAdminForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.formdata);

  const onSubmit = (values) => {
    dispatch(updateFormdata(values));
    navigate("/identity-document");
    // console.log(values, "form");
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        // initialValues={state}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <Field
                name="name"
                component={Input}
                label={"Full Name"}
                validate={required("Full Name")}
              />
            </div>
            <div className="field">
              <Field
                name="email"
                component={Input}
                label={"Email Address"}
                validate={required("Email Address")}
              />
            </div>
            <Field
              name="phone_number"
              component={Input}
              label={"Phone"}
              validate={required("Phone number")}
            />

            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
                validate={required("Password")}
              />
            </div>
            <div className="field">
              <Field
                name="confirm_password"
                component={Input}
                label={"Confirm Password"}
                password
                validate={composeValidators(
                  required("Confirm Password"),
                  passwordMatch
                )}
              />
            </div>
            <Button
              type="submit"
              text={"Create Account"}
              className="auth_button_wrap"
              disabled={!valid}
            />
          </form>
        )}
      />
      <div className="center footer_terms">
        Copyright © Escrow-Tech 2023. All Rights Reserved.
      </div>
    </div>
  );
};

export default RegisterAdminForm;
