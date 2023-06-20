import React from "react";

import { Form, Field } from "react-final-form";
import Input from "components/primitives/input/Input";
import Button from "components/widgets/Button/Button";

const RegisterAdminForm = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="auth_form">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, values, submitting, pristine, form }) => (
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <Field
                name="name"
                component={Input}
                label={"Full Name"}
              />
            </div>
            <div className="field">
              <Field
                name="email"
                component={Input}
                label={"Email Address"}
              />
            </div>
            <Field
              name="phone_number"
              component={Input}
              label={"Phone"}
            />

            <div className="field">
              <Field
                name="password"
                component={Input}
                label={"Password"}
                password
              />
            </div>
            <div className="field">
              <Field
                name="confirm_password"
                component={Input}
                label={"Confirm Password"}
                password
              />
            </div>
            <div className="auth_button_wrap">
              <Button type="submit" text={"Create Account"} />
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default RegisterAdminForm;
